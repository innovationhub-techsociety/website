import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/home/Background";
import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Partners from "../components/home/Partners";
import Speakers from "../components/home/Speakers";
import Programs from "../components/home/Programs";
import Perks from "../components/home/Perks";
import Stats from "../components/home/Stats";
import Founders from "../components/home/Founders";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

const isUserLoggedIn = () => {
  console.log("Checking login status...");
  console.log("Access Token Exists?: ", !!localStorage.getItem("accessToken"));
  return !!localStorage.getItem("accessToken");
};

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />
      <Header />
      <Hero />
      <Partners />
      <Speakers />
      <Programs />
      <Perks />
      <Stats />
      <Founders />
      <CTA />
      <Footer />
    </div>
  );
}