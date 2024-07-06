import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./home.css";
import ButtonMore from "../components/ButtonMore";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Footer from "../components/Footer";
import Features from "../components/Features/Features";
import Loader from "../components/Loader";
import axios from "axios";
import Cookies from "js-cookie";
function Home() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const navigation = useNavigation();
  const location = useLocation();
  const state = location.state;
  const isLoading = navigation.state == "loading";
  // async function handleClick() {
  //   // const res = await fetch(
  //   //   `https://knowledge-sharing-1.onrender.com/api/v1/users/getMe`,
  //   //   {
  //   //     method: "GET",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     credentials: "include",
  //   //   }
  //   // );
  //   // const data = await res.json();
  //   // console.log(data);

  // }
  function handleMoreClick1() {
    setShow1((show1) => !show1);
  }
  function handleMoreClick2() {
    setShow2((show2) => !show2);
  }
  function handleMoreClick3() {
    setShow3((show3) => !show3);
  }
  useEffect(() => {
    function scroll() {
      var element = document.getElementById("about");
      if (state) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    scroll();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header active="home" />
          <div className="home">
            <div className="container one">
              <div className="left">
                <h1>All You Want To Know About Coding, Join Us Now!!</h1>
                <p>
                  Welcome To Knowledge share learn know skill and learn the
                  rightful path without distracting yourself track your
                  improvement and share it with your colligues
                </p>
                <Link to="/courses">
                  <span className="gradient">Get Started</span>
                </Link>
              </div>
              <div className="right">
                <img src="../../public/office.jpg" />
                <span className="teacher">#Experienced Teacher</span>
                <span className="learning">#Unique Learning</span>
              </div>
            </div>
            <Features />
            <div className="container two" id="about">
              <div className="leftt">
                <h2>Our Vision</h2>
                <p>
                  Mission Statement: "Our mission is to revolutionize the way
                  people interact with technology by creating intuitive and
                  user-friendly solutions that enhance everyday experiences."
                  {show1 ? (
                    <>
                      <br /> Long-term Goals: "We envision a future where our
                      products empower individuals and businesses to thrive in a
                      digital world, fostering creativity, productivity, and
                      connectivity."
                      <br /> Values: "At the core of our company, we value
                      innovation, integrity, inclusivity, and sustainability.
                      These principles guide every decision we make and every
                      product we create." <br />
                      Impact: "We aspire to make a positive impact by bridging
                      gaps, breaking barriers, and empowering people to achieve
                      their goals, ultimately contributing to a more connected
                      and prosperous society." <br /> Inspiration: "We are
                      inspired by the potential of technology to drive
                      meaningful change and improve lives. This belief fuels our
                      passion and commitment to pushing the boundaries of what's
                      possible."{" "}
                      <ButtonMore onClick={handleMoreClick1}>
                        show less...
                      </ButtonMore>
                    </>
                  ) : (
                    <ButtonMore onClick={handleMoreClick1}>
                      show more...
                    </ButtonMore>
                  )}
                </p>
                <img
                  src="../../public/home2.jpeg"
                  className="home-image h-two"
                />
                <h2>Our Process:</h2>
                <p>
                  Initial Assessment: "We begin by conducting comprehensive
                  assessments to gain a deep understanding of our clients'
                  objectives, target audience, and competitive landscape."
                  {show2 ? (
                    <>
                      {" "}
                      Planning: "Based on our assessment, we develop detailed
                      strategic plans outlining project scope, milestones, and
                      deliverables, ensuring alignment with our clients' goals
                      and expectations." Execution: "Our experienced team of
                      designers, developers, and project managers work
                      collaboratively to execute the plan with precision,
                      creativity, and attention to detail, leveraging the latest
                      tools and technologies." Quality Assurance: "We have
                      rigorous quality assurance processes in place to ensure
                      that every product meets our high standards of
                      performance, usability, and reliability. This includes
                      thorough testing, user feedback loops, and continuous
                      refinement." Feedback and Iteration: "We believe in the
                      power of feedback to drive improvement. Throughout the
                      development process, we actively seek input from users and
                      stakeholders, using their insights to iterate and refine
                      our solutions until they exceed expectations."
                      <ButtonMore onClick={handleMoreClick2}>
                        show less...
                      </ButtonMore>{" "}
                    </>
                  ) : (
                    <ButtonMore onClick={handleMoreClick2}>
                      show more...
                    </ButtonMore>
                  )}
                </p>
              </div>
              <div className="rightt">
                <img
                  src="../../public/home1.jpeg"
                  className="first home-image h-one"
                />
                <h2>Our Approach:</h2>
                <p>
                  Problem-solving Methodology: "Our approach is rooted in a
                  rigorous problem-solving methodology that involves thorough
                  research, empathetic understanding of user needs, and
                  iterative design and development."{" "}
                  {show3 ? (
                    <>
                      {" "}
                      Customer-Centric Focus: "We prioritize the needs and
                      preferences of our customers at every stage of the product
                      development process, ensuring that our solutions are
                      intuitive, accessible, and tailored to their
                      requirements." Innovation: "We foster a culture of
                      innovation where every team member is encouraged to think
                      creatively, explore new ideas, and challenge conventional
                      thinking to drive continuous improvement and evolution."
                      Collaboration: "Collaboration is at the heart of our
                      approach. We believe in the power of teamwork and actively
                      collaborate with clients, partners, and stakeholders to
                      co-create solutions that deliver maximum value."
                      Adaptability: "In a rapidly changing landscape, we remain
                      agile and adaptable, embracing new technologies,
                      methodologies, and best practices to stay ahead of the
                      curve and meet the evolving needs of our users."{" "}
                      <ButtonMore onClick={handleMoreClick3}>
                        show less...
                      </ButtonMore>{" "}
                    </>
                  ) : (
                    <ButtonMore onClick={handleMoreClick3}>
                      show more...
                    </ButtonMore>
                  )}
                </p>
                <div className="image-after">
                  <img
                    src="../../public/home3.jpeg"
                    className="home-image h-three"
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
