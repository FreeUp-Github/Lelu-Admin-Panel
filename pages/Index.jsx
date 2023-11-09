import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import { useScrollTrigger } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const drawerWidth = 240;
const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Sign In",
    to: "/sign-in",
  },
  {
    label: "Sign Up",
    to: "/sign-up",
  },
];

function Index(props) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        LeLu
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Link to={item.to}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    var eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(
      messageEvent,
      function (e) {
        var key = e.message ? "message" : "data";
        var data = e[key];
        switch (data) {
          case "open":
            setIsChatOpen(true);
            break;
          case "close":
            setIsChatOpen(false);
            break;
        }
        //run function//
      },
      false
    );
  }, []);

  function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 50,
      target: window,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      color: trigger ? "primary" : "transparent",
    });
  }

  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

  function AppBarFactory(props) {
    return (
      <AppBar component="nav" {...props} scroll>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            LeLu Chat
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/sign-in">
              <Button
                variant="contain"
                color={props.color === "transparent" ? "primary" : "info"}
              >
                Sign In
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Box>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBarFactory></AppBarFactory>
      </ElevationScroll>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{}}>
        <Toolbar />
        {/* <Typography>LeLu!</Typography> */}

        <main>
          <div
            className="relative pt-16 pb-32 flex content-center items-center justify-center w-full"
            style={{
              minHeight: "75vh",
            }}
          >
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1 className="text-white font-semibold text-5xl">
                      Easily Chat with your clients
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                      chatting with client is a must have for every website,
                      easily integrate your website with LeLu Chat
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>

          <section className="pb-20 bg-gray-300 -mt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Online Chatting</h6>
                      <p className="mt-2 mb-4 text-gray-600">
                        Secure way to chat with your client and easily support
                        your clients
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <i className="fas fa-retweet"></i>
                      </div>
                      <h6 className="text-xl font-semibold">
                        Turn visitors to clients
                      </h6>
                      <p className="mt-2 mb-4 text-gray-600">
                        Easily track your online visitors and chat with them
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                        <i className="fas fa-fingerprint"></i>
                      </div>
                      <h6 className="text-xl font-semibold">
                        Automatic Messaging
                      </h6>
                      <p className="mt-2 mb-4 text-gray-600">
                        Automatically send message to your client based on
                        defined scenarios
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-wrap items-center mt-32">
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                    <i className="fas fa-user-friends text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    Working with us is a pleasure
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                    Don't let your uses guess by attaching tooltips and popoves
                    to any element. Just make sure you enable them first via
                    JavaScript.
                  </p>
                  <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                    The kit comes with three pre-built pages to help you get
                    started faster. You can change the text and images and
                    you're good to go. Just make sure you enable them first via
                    JavaScript.
                  </p>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
                    className="font-bold text-gray-800 mt-8"
                  >
                    Check Tailwind Starter Kit!
                  </a>
                </div>

                <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                      className="w-full align-middle rounded-t-lg"
                    />
                    <blockquote className="relative p-8 mb-4">
                      <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 583 95"
                        className="absolute left-0 w-full block"
                        style={{
                          height: "95px",
                          top: "-94px",
                        }}
                      >
                        <polygon
                          points="-30,95 583,95 583,65"
                          className="text-pink-600 fill-current"
                        ></polygon>
                      </svg>
                      <h4 className="text-xl font-bold text-white">
                        Top Notch Services
                      </h4>
                      <p className="text-md font-light mt-2 text-white">
                        The Arctic Ocean freezes every winter and much of the
                        sea-ice then thaws every summer, and that process will
                        continue whatever happens.
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div> */}
            </div>
          </section>

          {/* <section className="relative py-20">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
              style={{ height: "80px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-white fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold">
                      A growing company
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                      The extension comes with three pre-built pages to help you
                      get started faster. You can change the text and images and
                      you're good to go.
                    </p>
                    <ul className="list-none mt-6">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="fas fa-fingerprint"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Carefully crafted components
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="fab fa-html5"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Amazing page examples
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="far fa-paper-plane"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Dynamic components
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-20 pb-48">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold">
                    Here are our heroes
                  </h2>
                  <p className="text-lg leading-relaxed m-4 text-gray-600">
                    According to the National Oceanic and Atmospheric
                    Administration, Ted, Scambos, NSIDClead scentist, puts the
                    potentially record maximum.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      className="shadow-lg rounded-full max-w-full mx-auto"
                      style={{ maxWidth: "120px" }}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Ryan Tompson</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Web Developer
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                        <button
                          className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      className="shadow-lg rounded-full max-w-full mx-auto"
                      style={{ maxWidth: "120px" }}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Romina Hadid</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Marketing Specialist
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      className="shadow-lg rounded-full max-w-full mx-auto"
                      style={{ maxWidth: "120px" }}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Alexa Smith</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        UI/UX Designer
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      className="shadow-lg rounded-full max-w-full mx-auto"
                      style={{ maxWidth: "120px" }}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Jenna Kardi</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Founder and CEO
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 relative block bg-gray-900">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
              style={{ height: "80px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-900 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-white">
                    Build something
                  </h2>
                  <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                    Put the potentially record low maximum sea ice extent tihs
                    year down to low ice. According to the National Oceanic and
                    Atmospheric Administration, Ted, Scambos.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mt-12 justify-center">
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-white">
                    Excelent Services
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Grow your market
                  </h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Launch time
                  </h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative block py-24 lg:pt-0 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
                    <div className="flex-auto p-5 lg:p-10">
                      <h4 className="text-2xl font-semibold">
                        Want to work with us?
                      </h4>
                      <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                        Complete this form and we will get back to you in 24
                        hours.
                      </p>
                      <div className="relative w-full mb-3 mt-8">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="full-name"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Full Name"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="message"
                        >
                          Message
                        </label>
                        <textarea
                          rows="4"
                          cols="80"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Type a message..."
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </main>

        <iframe
          id="lelu-chat-iframe"
          title="lelu-chat-iframe"
          src="/user/852eae72-981a-45b9-9679-44e7cee2c437"
          style={{
            ...(isChatOpen
              ? { width: "400px", height: "600px" }
              : { width: "52px", height: "52px" }),

            position: "fixed",
            bottom: "12px",
            right: "12px",
            zIndex: 1,
          }}
        ></iframe>
      </Box>
    </Box>
  );
}

Index.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export { Index };
