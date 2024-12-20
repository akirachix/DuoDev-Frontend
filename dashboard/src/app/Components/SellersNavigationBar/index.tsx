import Image from "next/image"
import Link from "next/link"
export default function SellersNavigationBar() {
    return (
        <div>
            <nav className="bg-artisticblue w-full text-white py-5 flex justify-between items-center">
                <section>
                    <Image
                        src={"/logo.jpeg"}
                        alt="logo"
                        width={300}
                        height={200} />
                </section>
                <section>
                    <ul className="flex gap-10 lg:mr-20 mr-10">
                        <Link href={"/seller/home"}>
                            <li className="hover:text-forestgreen">Home</li>
                        </Link>
                        <Link href={"/seller/posts"}>
                            <li className="hover:text-forestgreen">Posts</li>
                        </Link>
                        <Link href={"/seller/marketplace"}>
                            <li className="hover:text-forestgreen">Marketplace</li>
                        </Link>
                    </ul>
                </section>

            </nav>

        </div>
    )
}