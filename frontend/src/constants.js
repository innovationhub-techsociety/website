export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export const API_URL = "http://127.0.0.1";

import { Users, Rocket, Lightbulb, Award, Zap, TrendingUp } from "lucide-react";

export const STATS = {
    foundingYear: "2025",
    spotsAvailable: "200",
    programDuration: "12 months",
    launchDate: "19th October 2025"
};

export const PROGRAMS = [
    {
        icon: Users,
        title: "Guest Speakers",
        duration: "Monthly",
        description: "Learn from industry leaders and innovators from top institutions and universities.",
        benefits: ["Industry experts", "Q&A sessions", "Networking opportunities", "Career guidance"],
        color: "from-purple-600 to-fuchsia-600"
    },
    {
        icon: Rocket,
        title: "Competitions",
        duration: "Quarterly",
        description: "Put your skills to the test in hackathons, pitch competitions, and innovation challenges with real prizes",
        benefits: ["Internship Opportunities", "Mentorship awards", "Exposure to investors", "Portfolio projects"],
        color: "from-blue-600 to-cyan-600"
    },
    {
        icon: Lightbulb,
        title: "Workshops & Talks",
        duration: "Weekly",
        description: "Hands-on workshops covering everything from coding to product design, business strategy to personal branding",
        benefits: ["Technical skills", "Soft skills training", "Interactive sessions", "Expert facilitators"],
        color: "from-fuchsia-600 to-pink-600"
    }
];

export const PERKS = [
    { icon: Lightbulb, text: "Free workshops & masterclasses" },
    { icon: Users, text: "Exclusive networking events" },
    { icon: Award, text: "Certification programs" },
    { icon: Zap, text: "24/7 community support" },
    { icon: TrendingUp, text: "Career placement assistance" },
    { icon: Rocket, text: "Access to funding & grants" }
];

export const FOUNDERS = [
    {
        name: "Akashdeep Das",
        title: "Founder and President",
        imageUrl: "akash.jpg",
        socialUrl: "https://www.linkedin.com/in/akashdeep-das-49b72937b/"
    },
    {
        name: "Nimit Jalan",
        title: "Co-Founder & Tech Ambassador",
        imageUrl: "nimit.jpg",
        socialUrl: "https://www.linkedin.com/in/nimit-jalan/"
    },
    {
        name: "Vedant Jain",
        title: "Our STEM Ambassador",
        imageUrl: "vedant.png",
        socialUrl: "https://www.linkedin.com/in/vedant-jain-05561229a/"
    },
    {
        name: "Mahnoor Khan",
        title: "Content and Social Outreach Ambassador",
        imageUrl: "mahnoor.png",
        socialUrl: "#"
    }
];

export const PARTNERS = [
    { name: "Hack4Health", logo: "/partners/hack4health.png", url: "https://hack4health.xyz/" },
    { name: "YRI", logo: "/partners/yri.png", url: "https://www.yriscience.com/" },
    { name: "APStudy", logo: "/partners/apstudy.png", url: "https://apstudy.org/" },
    { name: "International AI Youth Project", logo: "https://placehold.co/200x80?text=International+AI+Youth", url: "#" }
];

export const UNIVERSITIES = [
    { name: "Stanford University", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png" },
    { name: "University of Waterloo", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_of_Waterloo_seal.svg/1200px-University_of_Waterloo_seal.svg.png" }
];