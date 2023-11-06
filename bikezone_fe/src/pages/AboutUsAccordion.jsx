import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export function AboutUsAccordion() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader className="border-b border-gray-400 py-2" onClick={() => handleOpen(1)}>
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold">Bike Parts and Accessories</span>
            <i class="fas fa-chevron-down"></i>
          </div>
        </AccordionHeader>
        <AccordionBody className="py-4">
          <p class="text-gray-700 mb-2">
            Welcome to our collection of high-quality bike parts and accessories. Explore a wide range of products and services
            tailored to meet your biking needs.
          </p>
          <ul class="list-disc list-inside pl-4">
            <li>Discover a variety of bike parts, including tires, chains, brakes, and more.</li>
            <li>Add your favorite products to the cart for easy ordering.</li>
            <li>Share your thoughts and experiences by leaving reviews.</li>
            <li>Place orders securely through our user-friendly interface.</li>
            <li>Make payments with confidence using our trusted payment methods.</li>
          </ul>
          <div class="mt-4">
            <Link to="/featuredproducts" class="text-blue-900 hover:underline">Explore Bike Parts</Link>
          </div>
        </AccordionBody>
      </Accordion>


      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader className="border-b border-gray-400 py-2" onClick={() => handleOpen(2)}>
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold">Workshop Details</span>
            <i class="fas fa-chevron-down"></i>
          </div>
        </AccordionHeader>
        <AccordionBody className="py-4">
          <p class="text-gray-700 mb-2">
            Explore our workshop services designed to keep your bike in top condition. Our experienced team provides maintenance
            and repairs to ensure your bike runs smoothly.
          </p>
          <p class="text-gray-700 mb-2">
            You can easily book an appointment for your bike servicing needs. We offer convenient scheduling and efficient service.
          </p>
          <div class="mt-4">
            <Link href="/workshops" class="text-blue-900 hover:underline">Explore Workshops</Link>
          </div>
        </AccordionBody>
      </Accordion>


      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader className="border-b border-gray-400 py-2" onClick={() => handleOpen(3)}>
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold">Blog Posts</span>
            <i class="fas fa-chevron-down"></i>
          </div>
        </AccordionHeader>
        <AccordionBody className="py-4">
          <p class="text-gray-700 mb-2">
            Explore our blog posts to learn from other biking enthusiasts. Share your experiences, read stories, and stay updated
            with the latest biking trends.
          </p>
          <p class="text-gray-700 mb-2">
            Contribute your own experiences and thoughts by writing your own blog posts. Engage with our biking community and enjoy
            interacting with fellow riders.
          </p>
          <div class="mt-4">
            <Link to="/blogs" class="text-blue-900 hover:underline">Read Blogs</Link>
            <Link to="/blog/new" class="ml-4 text-blue-900 hover:underline">Write Blog</Link>
          </div>
        </AccordionBody>
      </Accordion>

    </>

  );
}