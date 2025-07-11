import Link from "next/link";
import PostMenu from "../posts/PostMenu";
import { Logo } from "./Logo";

export default function Header() {
  return (
    <header className='bg-gray-800 py-5'>
        <div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center px-40'>
          <div className='max-w-[80px] w-full'>
            <Link href={'/posts'}>
                <Logo />
            </Link>
          </div>

          <PostMenu/>
        </div>
      </header>
  )
}
