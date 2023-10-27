import React from 'react';
import { IconContext } from "react-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { ConnectWallet } from "@thirdweb-dev/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Switch,NavbarMenuToggle ,NavbarMenu,NavbarMenuItem,Divider,Card,CardBody,CardFooter,CardHeader} from "@nextui-org/react";
import { NextPage } from "next";
import Head from "next/head";
import { useTheme } from "next-themes";
import MoonIcon from "./moon";
import SunIcon from "./sun";
import { FaFire,FaTag , FaGift} from  'react-icons/fa6';
import { Tabs } from 'flowbite-react';


const Home: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const menuItems = [
    "Explore",
    "Projects",
    "Help & Feedback",
  ];
  const toggleTheme = () => {
    // Toggle between 'light' and 'dark' themes
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div >
       <Head>
      <title>Web3SolutionsPro - Home</title>
    </Head>
 <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          
          <p className="font-bold text-inherit">Web3SolutionsPro</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          
          <p className="font-bold text-inherit">Web3SolutionsPro</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Explore
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Projects
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
           <Switch
      defaultSelected
      size="lg"
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? ( 
          <SunIcon className={className}  />
        ) : (
          <MoonIcon className={className} />
        )
      }
      onChange={toggleTheme}
    >
    </Switch>
        &nbsp;&nbsp;&nbsp;
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 0 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    <br></br>
    <div className="justify-center text-center">
    <ConnectWallet
        theme={theme as ("light" | "dark" | undefined)}
        modalTitle={"Connect"}
        modalSize={"wide"}
        welcomeScreen={{
          title:
            "Your gateway to a safe  decentralized world of   Secured Web3 Solutions ",
          img: {
            src: "",
            width: 150,
            height: 150,
          },
        }}
        modalTitleIconUrl={""}
      />
      </div>
      <br></br><br></br>
      <div className="max-w-6xl  mx-auto grid place-items-center">
      <Carousel>
      <div>
                      <img src="/images/decentralizededit.webp" alt="Decentralized Solution" max-height="100px"/>
                     <p  className="bg-transparent legend font-extrabold text-white">Pioneering the Future of Decentralization<br></br>
                     <span className="font-normal text-white">At Web3SolutionsPro, we&apos;re not just providing solutions; we&apos;re shaping a decentralized future. With innovation at our core, we empower individuals and businesses to break free from centralized constraints. Explore a world where trust, security, and autonomy are the norm. Join us on the journey to a decentralized tomorrow.</span></p>
                     
  
                  </div>
                  <div>
                      <img src="/images/codesolution.webp" alt="Secure Code" />
                      <p  className="bg-transparent legend font-extrabold text-white">Securing Tomorrow&apos;s Digital Frontier, Today<br></br>
                     <span className="font-normal text-white">Behind the scenes at Web3SolutionsPro, we&apos;re committed to safeguarding your digital world. Our code is more than just lines;it&apos;s a fortress of security. With meticulous attention to detail and state-of-the-art practices, we ensure your data is protected, your transactions are safe, and your trust is never compromised. Experience peace of mind with the security of Web3SolutionsPro.</span></p>
  
                  </div>
                  <div>
                      <img src="/images/connectedit.webp" alt="Connection"/>
                      <p  className="bg-transparent legend font-extrabold text-white">Empowering a Global Community through Web3 Solutions<br></br>
                     <span className="font-normal text-white">At Web3SolutionsPro, we&apos;re on a mission to tackle web3 challenges for users worldwide. With a focus on inclusivity and innovation, we&apos;re breaking down barriers and creating accessible solutions that transcend borders. Join our diverse community and experience the boundless possibilities of the decentralized web. Together, we&apos;re solving web3 issues for a world without boundaries.</span></p>
                  </div>
                  <div>
                      <img src="/images/web3edited.webp" alt="image5"/>
                      <p  className="bg-transparent legend font-extrabold text-white">Fueling Innovation with Multi-Project Support<br></br>
                     <span className="font-normal text-white">At Web3SolutionsPro, we don&apos;t just support one project; we embrace a multitude. Our platform is designed to empower a dynamic ecosystem of projects and ventures. Whether you&apos;re a startup, an enterprise, or a creative individual, we&apos;ve got your back. Join us in fostering innovation, because at Web3SolutionsPro, we&apos;re your partner in success across multiple projects.</span></p>
  
                  </div>
      </Carousel>
      </div>
  <Divider/>
    
    <Tabs.Group
      aria-label="Full width tabs"
      style="fullWidth"
    >
      <Tabs.Item
        active
        icon={FaFire}
        title="Trending"
      >
        <IconContext.Provider value={{ color: "#aa4203", className: "global-class-name" }}>
         <div className="grid grid-cols-2 px-1 sm:grid-cols-4 gap-4 sm:px-5">
<Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          src="/images/beagleswap.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Beagleswap&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">Beagleswap.xyz</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Beagleswap Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Beagleswap"
        >
          Explore Beagleswap
        </Link>
      </CardFooter>
    </Card><Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/cashmere.webp"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Cashmere Labs&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">cashmere.exchange</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Cashmere Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Cashmere Labs"
        >
          Explore Cashmere
        </Link>
      </CardFooter>
    </Card><Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/plexus.webp"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Plexus&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">plexus.app</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Plexus Features </p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Plexus"
        >
          Explore Plexus
        </Link>
      </CardFooter>
    </Card><Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/robots.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Robots.Farm&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">robots.farm</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Robots.Farm Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Robots.Farms"
        >
          Explore Robots.Farms
        </Link>
      </CardFooter>
    </Card><Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/melon.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Melon.ooo&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">melon.ooo</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Melon.ooo Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Melon.ooo"
        >
          Explore Melon.ooo
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/mantle.webp"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Mantleswap&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">app.mantleswap.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Mantleswap Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Mantleswap"
        >
          Explore Mantleswap
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/scroll.webp"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Scroll&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">scroll.io</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Scroll Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Scroll"
        >
          Explore Scroll
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/aark.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Aark Digital&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">aark.digital</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Aark Digital Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Aark Digital"
        >
          Explore Aark Digital
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/dackie.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Dackieswap&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">dackieswap.xyz</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Dackieswap Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Dackieswap"
        >
          Explore Dackieswap
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/sunflower.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Sunflower Land&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">sunflower-land.com</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Sunflower Land Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Sunflower Land"
        >
          Explore Sunflower Land
        </Link>
      </CardFooter>
    </Card><Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/monsterra.webp"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Monsterra&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">monsterra.io</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Monsterra Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Monsterra"
        >
          Explore Monsterra
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/metawin.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Metawin&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">metawin.com</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Metawin Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Metawin"
        >
          Explore Metawin
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/cheelee.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Cheelee&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">cheelee.io</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Cheelee Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Cheelee"
        >
          Explore Cheelee
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/arcomia.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Arcomia Metaverse&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">arcomia.io</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Arcomia Metaverse Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Arcomia Metaverse"
        >
          Explore Arcomia Metaverse
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/mar3ai.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Mar3ai&nbsp;<FaFire/></p>
          <p className="text-small text-default-500">mar3.ai</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Mar3ai Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Mar3ai"
        >
          Explore Mar3ai
        </Link>
      </CardFooter>
    </Card>
    </div>
    </IconContext.Provider>
      </Tabs.Item>
      
      <Tabs.Item
        icon={FaTag}
        title="Featured"
      >
        <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
       <div className="grid grid-cols-2 px-1 sm:grid-cols-4 gap-4 sm:px-5">
       <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/dew.svg"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Dew&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">dew.gg</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Dew Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Dew"
        >
          Explore Dew
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/masa.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Masa&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">masa.finance</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Masa Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Masa"
        >
          Explore Masa
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/bgtrade.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">BGTrade&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">bgtrade.io</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore BGTrade Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=BGTrade"
        >
          Explore BGTrade
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/ambit.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Ambit Finance&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">ambitfi.com</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Ambit Finance Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Ambit Finance"
        >
          Explore Ambit Finance
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/zkpass.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">ZkPass&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">zkpass.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore ZkPass Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=ZkPass"
        >
          Explore ZkPass
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/readon.svg"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Readon&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">readon.me</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Readon Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Readon"
        >
          Explore Readon
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/mendi.svg"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Mendi Finance&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">mendi.finance</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore mendi Finance Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Mendi Finance"
        >
          Explore Mendi Finance
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/sparta.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">SpartaDEX&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">spartadex.io</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore SpartaDEX Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=SpartaDEX"
        >
          Explore SpartaDEX
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/vp.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Vision Protocol&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">vp.xyz</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Vision Protocol Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Vision Protocol"
        >
          Explore Vision Protocol
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          
          src="/images/taskon.svg"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Taskon&nbsp;<FaTag /></p>
          <p className="text-small text-default-500">taskon.xyz</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Explore Taskon Features</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="/explore?project=Taskon"
        >
          Explore Taskon
        </Link>
      </CardFooter>
    </Card>
       </div>
       </IconContext.Provider>
      </Tabs.Item>
      <Tabs.Item
        disabled
        icon={FaGift}
        title="Airdrops"
      >
        <p>
          Disabled content
        </p>
      </Tabs.Item>
    </Tabs.Group>
     
    <br></br>
   
    </div>
  );
};

export default Home;
