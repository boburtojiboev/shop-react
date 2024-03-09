import React, { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Tab,
  Accordion,
  Typography,
  AccordionDetails,
  Button,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TabContext, TabPanel } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import "../../../css/help.css";
import Marginer from "../../components/marginer";
import { NavbarOthers } from "../../components/header/others";
import { Close, Home } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
// import { sweetTopSmallSuccessAlert } from "../../app/lib/sweetAlert";

export function HelpPage() {
  // Initializations//
  const [value, setValue] = React.useState("1");
   const history = useHistory();
  const faq = [
    {
      question:
        "Are my personal details and payment information secure, right?",
      answer:
        " Yes, we prioritize the security of your information. Our website uses SSL encryption for secure data transmission.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods, including credit/debit cards, PayPal, and other secure payment gateways. You can view all available options during the checkout process.",
    },
    {
      question: "How can I track my order?",
      answer:
        " Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order on our website or the respective courier's site.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we offer international shipping. Shipping costs and delivery times vary based on your location. You can calculate shipping costs during the checkout process.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return items within 30 days of receiving your order. Please visit our 'Returns' page for detailed instructions and eligibility criteria.",
    },
    {
      question: "How do I cancel an order?",
      answer:
        "Orders can be canceled within a short period after placing them. Visit your order history or contact our customer support for assistance. Note that we process orders quickly, so act promptly.",
    },
    {
      question: " How can I place an order on your website?",
      answer:
        "A: To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the steps to provide shipping information and payment details.",
    },
    {
      question:
        "How do I subscribe to your newsletter for updates and promotions?",
      answer:
        "You can subscribe to our newsletter by entering your email address in the subscription box on our homepage. Stay tuned for exclusive offers, promotions, and product updates.",
    },
    {
      question: " Can I change my shipping address after placing an order?",
      answer:
        "Contact our customer support immediately if you need to change your shipping address. We'll assist you in updating the information if the order hasn't been shipped yet.",
    },
    {
      question: " How can I reset my password?",
      answer: ` You can reset your password on the login page by clicking the "Forgot Password" link. Follow the instructions sent to your registered email to create a new password.`,
    },
  ];
  const rules = [
    ` Registration is required for you to fully place orders from the site and to benefit from live discussions.`,
    `Once you have executed payment for your orders, there is no possibility for cancellation; therefore, please verify before making any payments.`,
    `The use of inappropriate language is strictly prohibited during live interactions.`,
    `Posting and distributing personal advertisements without the permission of an admin is not allowed.`,
    `Your articles must adhere to the boundaries of decorum and respect.`,
    `As all your actions are under the supervision of our admins, please respect our requests and comply with our requirements.`,
    `Advertising for other sites, services, or products in any form, even non-commercially, is prohibited.`,
    `Distributing users personal information (including email addresses or phone numbers) in public display areas is not allowed.`,
    `Users engaging in coercing, bullying, or other forms of inappropriate behavior towards other users are prohibited.`,
    `Distributing false information about our service or products by users is prohibited.`,
    `Users must use names and profile pictures that accurately represent them.`,
    `Order pictures and descriptions must be identical to the actual product. Descriptions should only describe your product without additional elements.`,
    `The site does not assume responsibility for any form of trading between users and such actions shall be an agreement between the users involved.`,
    `All messages and comments are checked, and content that is found unacceptable will be removed.`,
    `Users are required to be respectful and considerate towards each other.`,
    `Any hostile, disrespectful, or antagonistic behavior towards the site or its other members is prohibited.`,
  ];

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  /*HANDLERS*/
  //  const submitHandler = () => {
  //    if (name !== "" && email !== "" && message !== "") {
  //      setName("");
  //      setEmail("");
  //      setMessage("");
  //      sweetTopSmallSuccessAlert("Sent successfully", 800, false);
  //    }
  //  };

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      <NavbarOthers />
      <div className="mobile_version">
        <p> Mobile version is on developing process! Please use laptop</p>
      </div>
      <div className="help_page">
        <Container>
          {" "}
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/")} className="home_link">
              Help
              <Close className="close" />
            </Box>
          </Box>
        </Container>
        <Container maxWidth="lg" sx={{ mt: "20px", mb: "50px" }}>
          <TabContext value={value}>
            <Box className={"help_menu"}>
              <Box>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tab
                    style={{ marginLeft: "150px", marginRight: "150px" }}
                    label="Rules"
                    value={"1"}
                  />
                  <Tab
                    style={{ marginLeft: "150px", marginRight: "150px" }}
                    label="FAQ"
                    value={"2"}
                  />
                  <Tab
                    style={{ marginLeft: "150px", marginRight: "150px" }}
                    label="Send to Admin"
                    value={"3"}
                  />
                </TabList>
              </Box>
            </Box>
            <Stack alignItems={"center"} sx={{ width: "100%", height: "auto" }}>
              <Stack className="help_main_content">
                <Box>
                  <Marginer width="1272px" height="1" bg="#000" />
                </Box>

                <TabPanel value={"1"}>
                  <Stack className="theRules_box">
                    <Box className="theRulesFrame">
                      {rules.map((ele) => {
                        return <p>{ele}</p>;
                      })}
                    </Box>
                  </Stack>
                </TabPanel>

                <TabPanel value={"2"}>
                  <Stack className="accordian_menu">
                    {faq.map((ele) => {
                      return (
                        <Accordion>
                          <AccordionSummary
                            style={{ marginLeft: "35px" }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panella-cintent"
                            id="panella-header"
                          >
                            <Typography sx={{ mb: "15px" }}>
                              {ele.question}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{ele.answer}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Stack>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Stack className="admin_letter_box">
                    <Stack className="admin_letter_container">
                      <Box className="admin_letter_frame">
                        <span>Sending email to Admin</span>
                        <p>
                          Hello! You can send text to admin by completing forms
                          below{" "}
                        </p>
                      </Box>
                      <form
                        action="#"
                        method="POST"
                        className="admin_letter_frame"
                      >
                        <div className="admin_input_box">
                          <label>Name</label>
                          <input
                            required
                            type="text"
                            name="mb_nick"
                            placeholder="Name"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="admin_input_box">
                          <label>Email address</label>
                          <input
                            required
                            id="email"
                            autoComplete="off"
                            type="text"
                            name="mb_email"
                            placeholder="Your email address"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="admin_input_box">
                          <label>Text</label>
                          <textarea
                            required
                            name="mb_msg"
                            placeholder="Text"
                            // value={message}
                            // onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                        </div>
                        <Box
                          className="admin_btn"
                          display={"flex"}
                          justifyContent={"flex-end"}
                          sx={{ mt: "30px" }}
                        >
                          <Button
                            style={{ marginTop: "10px" }}
                            type="submit"
                            variant="contained"
                            // onClick={submitHandler}
                            className="submit_btn"
                          >
                            Send
                          </Button>
                        </Box>
                      </form>
                    </Stack>
                  </Stack>
                </TabPanel>
              </Stack>
            </Stack>
          </TabContext>
        </Container>
      </div>
    </div>
  );
}
