import NavBar from "../../components/Nav/NavBar";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import hero from "../../assets/images/Ecobuddi_Team_Photo.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const text = [
  {
    title: "Our Story: From Idea to Action",
    content: `Welcome to Ecobuddi, where we believe in the power of transformation.
    Our journey began with a simple yet profound idea - to turn clutter
    into cash, and in the process, change the way students interact with
    their unwanted belongings and the environment.`,
  },
  {
    title: "The Birth of Ecobuddi",
    content: `Amid brainstorming sessions and countless cups of coffee, the Ecobuddi concept was born. We asked ourselves, "What if we could create a marketplace that helped students declutter their lives and put money in their pockets?" That spark of inspiration fuelled our commitment to make it a reality.`,
  },
  {
    title: "Our Mission",
    content: `We're not just a marketplace; we're a community that believes in the potential of every item, the value of sustainability, and the importance of student empowerment.
    Our team, hailing from multiple African countries, shares a deep passion for technology and a commitment to positively impacting the continent.
    We invite you to join us on this exciting journey of solving a real problem that impacts students and the environment. Together, we can make a difference.`,
  },
];

const About = () => {
  const navigate = useNavigate("/");

  return (
    <>
      <NavBar />

      <div className=" mb-10 lg:mb-16 flex flex-col lg:gap-[4rem] gap-10 text-center mt-20">
        <h1 className="xl:text-8xl lg:text-6xl text-4xl text-primary font-bold lg:w-[75%] mx-auto">
          Welcome to <span className="text-secondary">ECOBBUDi:</span>{" "}
          <span>Turn Clutter to Cash</span>
        </h1>
        <p className="xl:w-[50%] lg:w-[75%] mx-auto">
          {
            "At Ecobuddi, we've crafted a platform with a singular mission – empowering students to declutter their lives while unlocking the value in their pre-loved items. Our unique approach to online selling is revolutionizing the student marketplace, making it easier and more lucrative than ever."
          }
        </p>
        <Button
          className=" bg-orange-500 w-fit py-3 px-4 mx-auto text-white transition-all delay-[25ms] text-center rounded-xl font-bold"
          onClick={() => navigate("/shop")}
        >
          SHOP NOW
        </Button>
      </div>
      <div className="lg:flex justify-center">
        <img src={hero} alt="" className=" lg:w-6/12" />
        
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper mt-5"
          >
            {text.map((text, index)=> (
              <>
              <SwiperSlide key={index} className="px-5 xl:px-16 text-center lg:text-left">
                <h2 className=" text-primary xl:text-6xl text-4xl font-bold">
                  {text.title}
                </h2>
                <p className=" lg:mt-5 leading-6">{text.content}</p>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default About;
