import FacebookIcon from "@/ui/Icons/FacebookIcon";
import InstagramIcon from "@/ui/Icons/InstagramIcon";
import Mail2Icon from "@/ui/Icons/Mail2Icon";
import PinrestIcon from "@/ui/Icons/PinrestIcon";
import TwitterIcon from "@/ui/Icons/TwitterIcon";
import YoutubeIcon from "@/ui/Icons/YoutubeIcon";

const foooterItems = [
  {
    name: "Workshops",
    route: "/workshop"
  },
  {
    name: "Blog",
    route: "/our-blog"
  },
  {
    name: "Clinical studies",
    route: "/clinical-studies"
  },
  {
    name: "The science",
    route: "/science"
  },
  {
    name: "Results",
    route: "/results"
  },
  {
    name: "FAQs",
    route: "/faq"
  },
  {
    name: "Shop",
    route: "/product/shop"
  },
  {
    name: "Contact us",
    route: "/contact"
  },
  {
    name: "Contact with CEO",
    route: "/contact-the-ceo"
  },
  {
    name: "Get help",
    route: "/get-help"
  }
];

const social_links = [
  {
    name: "Facebook",
    logo: <FacebookIcon />,
    path: "#"
  },
  {
    name: "Twitter",
    logo: <TwitterIcon />,
    path: "#"
  },
  {
    name: "Instagram",
    logo: <InstagramIcon />,
    path: "#"
  },
  {
    name: "Youtube",
    logo: <YoutubeIcon />,
    path: "#"
  }
];

const social_links2 = [
  {
    name: "Twitter",
    logo: <TwitterIcon IconWidth="18" IconHeight="18" />,
    path: "#"
  },
  {
    name: "Facebook",
    logo: <FacebookIcon IconWidth="21" IconHeight="21" />,
    path: "#"
  },

  {
    name: "Pinrest",
    logo: <PinrestIcon />,
    path: "#"
  },
  {
    name: "Mail",
    logo: <Mail2Icon />,
    path: "#"
  }
];

export { foooterItems, social_links, social_links2 };
