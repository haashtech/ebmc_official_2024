// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   MagnifyingGlassIcon,
//   ChevronUpDownIcon,
// } from "@heroicons/react/24/outline";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
// import {
//   Card,
//   CardHeader,
//   Input,
//   Typography,
//   Button,
//   CardBody,
//   Chip,
//   CardFooter,
//   Tabs,
//   TabsHeader,
//   Tab,
//   Avatar,
//   IconButton,
//   Tooltip,
// } from "@material-tailwind/react";

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Monitored",
//     value: "monitored",
//   },
//   {
//     label: "Unmonitored",
//     value: "unmonitored",
//   },
// ];

// const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

// const AmlTable = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sortConfig, setSortConfig] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [activeTab, setActiveTab] = useState("all");

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/admin/viewusers");
//       setUsers(response.data.users);
//     } catch (err) {
//       console.error("Error in fetching data", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let filtered = users;

//     if (activeTab !== "all") {
//       filtered = users.filter((user) =>
//         activeTab === "monitored" ? user.monitored : !user.monitored
//       );
//     }

//     if (search) {
//       filtered = filtered.filter((user) =>
//         user.name && user.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (sortConfig !== null) {
//       filtered = filtered.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     setFilteredUsers(filtered);
//   }, [users, search, sortConfig, activeTab]);

//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "ascending"
//     ) {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getCurrentPageItems = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
//   };

//   const handleTabChange = (value) => {
//     setActiveTab(value);
//     setCurrentPage(1);
//   };

//   return (
//     <Card className="h-full w-full">
//       <CardHeader floated={false} shadow={false} className="rounded-none">
//         <div className="mb-8 flex items-center justify-between gap-8">
//           <div>
//             <Typography variant="h5" color="blue-gray">
//               Members list
//             </Typography>
//             <Typography color="gray" className="mt-1 font-normal">
//               See information about all members
//             </Typography>
//           </div>
//           <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
//             <Button variant="outlined" size="sm">
//               view all
//             </Button>
//             <Button className="flex items-center gap-3" size="sm">
//               <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
//             </Button>
//           </div>
//         </div>
//         <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//           <Tabs value={activeTab} onChange={handleTabChange} className="w-full md:w-max">
//             <TabsHeader>
//               {TABS.map(({ label, value }) => (
//                 <Tab key={value} value={value}>
//                   &nbsp;&nbsp;{label}&nbsp;&nbsp;
//                 </Tab>
//               ))}
//             </TabsHeader>
//           </Tabs>
//           <div className="w-full md:w-72">
//             <Input
//               label="Search"
//               icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>
//       </CardHeader>
//       <CardBody className="overflow-scroll px-0">
//         <table className="mt-4 w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head, index) => (
//                 <th
//                   key={head}
//                   className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
//                   onClick={() => requestSort(head.toLowerCase())}
//                 >
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
//                   >
//                     {head}
//                     {index !== TABLE_HEAD.length - 1 && (
//                       <ChevronUpDownIcon
//                         strokeWidth={2}
//                         className={`h-4 w-4 ${
//                           sortConfig &&
//                           sortConfig.key === head.toLowerCase() &&
//                           sortConfig.direction === "ascending"
//                             ? "rotate-180"
//                             : ""
//                         }`}
//                       />
//                     )}
//                   </Typography>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {getCurrentPageItems().map(
//               ({ img, name, email, job, org, online, date }, index) => {
//                 const isLast = index === filteredUsers.length - 1;
//                 const classes = isLast
//                   ? "p-4"
//                   : "p-4 border-b border-blue-gray-50";

//                 return (
//                   <tr key={name}>
//                     <td className={classes}>
//                       <div className="flex items-center gap-3">
//                         <Avatar src={img} alt={name} size="sm" />
//                         <div className="flex flex-col">
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal"
//                           >
//                             {name}
//                           </Typography>
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal opacity-70"
//                           >
//                             {email}
//                           </Typography>
//                         </div>
//                       </div>
//                     </td>
//                     <td className={classes}>
//                       <div className="flex flex-col">
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal"
//                         >
//                           {job}
//                         </Typography>
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-normal opacity-70"
//                         >
//                           {org}
//                         </Typography>
//                       </div>
//                     </td>
//                     <td className={classes}>
//                       <div className="w-max">
//                         <Chip
//                           variant="ghost"
//                           size="sm"
//                           value={online ? "online" : "offline"}
//                           color={online ? "green" : "blue-gray"}
//                         />
//                       </div>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {date}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Tooltip content="Edit User">
//                         <IconButton variant="text">
//                           <PencilIcon className="h-4 w-4" />
//                         </IconButton>
//                       </Tooltip>
//                     </td>
//                   </tr>
//                 );
//               }
//             )}
//           </tbody>
//         </table>
//       </CardBody>
//       <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//         <Typography variant="small" color="blue-gray" className="font-normal">
//           Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
//         </Typography>
//         <div className="flex gap-2">
//           <Button
//             variant="outlined"
//             size="sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outlined"
//             size="sm"
//             disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default AmlTable;
