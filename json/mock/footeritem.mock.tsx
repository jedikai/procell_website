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
    name: "Clinical Studies",
    route: "/clinical-studies"
  },
  {
    name: "The Science",
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
    name: "Contact Us",
    route: "/contact"
  },
  {
    name: "Contact the CEO",
    route: "/contact-the-ceo"
  },
  {
    name: "Get Help",
    route: "/help"
  },
  // {
  //   name: "Get Treated",
  //   route: "/get-treated"
  // },
];

const social_links = [
  {
    name: "Facebook",
    logo: <FacebookIcon />,
    path: "https://www.facebook.com/procelltherapies/"
  },
  // {
  //   name: "Twitter",
  //   logo: <TwitterIcon />,
  //   path: "#"
  // },
  {
    name: "Instagram",
    logo: <InstagramIcon />,
    path: "https://www.instagram.com/procelltherapies/"
  },
  {
    name: "Youtube",
    logo: <YoutubeIcon />,
    path: "https://www.youtube.com/channel/UCO7nIDGEkMiuaRPDE7NtvZw"
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
