"use client"
import {
  ArrowDown,
  ArrowRight,
  MessageCircleQuestion,
  Plus,
  Repeat,
  WandSparkles,
} from "lucide-react"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { useAtom } from "jotai"
import { clsx } from "clsx"

import style from "./querybar.module.scss"
import { Modal } from "../modal/modal"
import { streamAtom } from "@/jotai/app-atoms"
import { Tooltip } from "../tooltip/tooltip"

const endpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT


export function Querybar() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"query" | "parrot">("query")
  const [, setStream] = useAtom(streamAtom)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }

  function handleInputKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleQuery()
    }
  }

  async function handleQuery() {
    setStream("")


    const response = await fetch(`${endpoint}/stream/${mode}`, {
      method: "POST",
      body: JSON.stringify({
        query: input,
      }),
    })

    if (!response.body) {
      setStream("No response body")
      return
    }

    const reader = response.body.getReader()

    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: readerDone } = await reader.read()
      done = readerDone
      if (value) {
        const chunk = decoder.decode(value, { stream: true })
        setStream((prev) => prev + chunk)
      }
    }
  }


  return (
    <div className={style.queryDiv}>
      <div className="flex flex-col mt-[40px] items-center gap-2">
        <WandSparkles size={60} strokeWidth={2} className="text-[var(--text-gray)]" />
        <h1 className={style.header}>JLLM</h1>
        <p>Get some streaming responses</p>

        <Modal.Trigger
          content={
            <>
              <Modal.Header>What&#39;s this?</Modal.Header>
              <Modal.Content>
                <p>This is a project built to implement a text stream from backend to the frontend, after receiving a text prompt. Commonly used on LLM products.</p>
                <p>
                  The backend has two main functions, one is to query the ChatGPT 4o Mini model and stream the response back to the frontend. The other is to simply stream back whatever you&#39;ve typed in chunks.
                </p>
                <p>
                  Text chunks are delayed slightly on purpose to enhance the results of the implementation.
                </p>
              </Modal.Content>
            </>
          }
        >
          <div className={style.whatsThisBtn}>
            <MessageCircleQuestion size={15} />
            What&#39;s this?
          </div>
        </Modal.Trigger>
      </div>

      <>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <Tooltip.Trigger content={<>Streams response from ChatGPT 4o Mini</>}>
              <button onClick={() => {
                setMode("query")
              }} className={clsx(style.button, style.withBg)}>
                Ask JLLM <ArrowDown size={15} />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Trigger content={<>Streams back whatever you&#39;ve typed</>}>
              <button onClick={() => {
                setMode("parrot")
              }} className={clsx(style.button, style.text)}>
                Parrot anything <Repeat size={14} />
              </button>
            </Tooltip.Trigger>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="ml-[4px] text-[var(--text-mild)] font-[600] text-[14px]">
            {mode === "query" ? "Ask me anything (10 requests/min)" : mode === "parrot" ? "Get me to parrot something (10 requests/min)" : ""
            }
          </h2>

          <div className={style.inputDiv}>
            <input
              value={input}
              placeholder="Anything"
              onChange={handleInputChange}
              className={style.queryInput}
              onKeyDown={handleInputKeyPress}
            />
            <div className="flex w-full justify-between pl-[10px]">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMode("query")
                  }}
                  className={clsx(style.chipBtn, mode === "query" && style.active)}
                >
                  <Plus size={12} strokeWidth={3} />
                  ChatGPT 4o Mini
                </button>
                <button
                  onClick={() => {
                    setMode("parrot")
                  }}
                  className={clsx(style.chipBtn, mode === "parrot" && style.active)}
                >
                  <Repeat size={12} strokeWidth={2.5} />
                  Parrot Mode
                </button>
              </div>
              <div></div>
              <button
                onClick={() => {
                  handleQuery()
                }}
                className={clsx(style.sendBtn, input.length > 0 && style.active)}>
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
