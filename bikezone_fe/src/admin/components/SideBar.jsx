import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { MdDashboard, MdStorage, MdOutlineRateReview } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineStock } from "react-icons/ai";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { RiMotorbikeFill } from "react-icons/ri";


const SideBar = () => {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="h-screen  max-w-[14rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Welcome Back!
                </Typography>
            </div>

            <List className="">
                <Link to={'/admin/dashboard'}>
                    <ListItem className="w-[85%]">
                        <ListItemPrefix>
                            <MdDashboard className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>

                <Accordion
                    className="w-[85%]"
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto b h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <MdStorage className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Products
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link to={'/admin/products'}>
                                <ListItem>
                                    <ListItemPrefix>
                                        <AiOutlineStock strokeWidth={3} className="h-4 w-5" />
                                    </ListItemPrefix>
                                    All Products
                                </ListItem>
                            </Link>
                            <Link to={'/admin/product/new'}>
                                <ListItem>
                                    <ListItemPrefix>
                                        <IoIosAddCircleOutline strokeWidth={3} className="h-4 w-5" />
                                    </ListItemPrefix>
                                    Create Product
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Link to={'/admin/orders'}>
                    <ListItem className="w-[85%]">
                        <ListItemPrefix>
                            <HiOutlineClipboardDocumentList className="h-5 w-5" />
                        </ListItemPrefix>
                        Orders
                    </ListItem>
                </Link>


                <Link to={'/admin/users'}>
                    <ListItem className="w-[85%]">
                        <ListItemPrefix>
                            <FaUsers className="h-5 w-5" />
                        </ListItemPrefix>
                        Users
                    </ListItem>
                </Link>


                <Link to={'/admin/reviews'}>
                    <ListItem className="w-[85%]">
                        <ListItemPrefix>
                            <MdOutlineRateReview className="h-5 w-5" />
                        </ListItemPrefix>
                        Reviews
                    </ListItem>
                </Link>



                <Link to={'/admin/workshops'}>
                    <ListItem className="w-[85%]">
                        <ListItemPrefix>
                            <GiAutoRepair className="h-5 w-5" />
                        </ListItemPrefix>
                        Workshops
                    </ListItem>
                </Link>

                <Link to={'/admin/rental-bikes'}>
                    <ListItem className="w-[85%]">
                        <ListItemPrefix>
                            <RiMotorbikeFill className="h-5 w-5" />
                        </ListItemPrefix>
                        Rental Bikes
                    </ListItem>
                </Link>

                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                </ListItem>

                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>

                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>

            </List>
        </Card>
    );
}

export default SideBar