import { Querybar } from "@/components/querybar/querybar";

import style from "./home.module.scss"
import { Stream } from "@/components/stream/stream"

export default function Home() {


  return (
    <div className="flex items-center justify-center w-full p-8 font-[family-name:var(--font-geist-sans)]">
      <main className={style.main}>
        <Querybar/>
        <Stream/>
      </main>
    </div>
  );
}
