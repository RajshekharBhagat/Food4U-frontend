import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Header from "@/components/header";

type Props = {
    children: React.ReactNode;
    showHero?: boolean;
}


const Layout = ({ children, showHero = false }:Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {
                showHero && <Hero/>
            }
            <div className="container mx-auto flex-1 py-10">
                {children}
            </div>
            <Footer />
       </div>
    )
}

export default Layout;
