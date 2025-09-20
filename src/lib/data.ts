export type User = {
  name: string;
  profileImage: string;
  gender: 'boy' | 'girl'; 
  id: number;
}

export type Activity = {
  user: number;
  id: number;
  message: string;
  createdAt: Date;
}

export type Order = {
  user: {
    name: string;
    profile: string;
  };
  id: string;
  project: string;
  address: string;
  date: Date;
  status: Status;
}

export type Status = 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';

export const getUsers = () => {
  const nameAndGender:Record<string, number>[] = [
    { 'Natali Craig': 0 },
    { 'Drew Cano': 1 },
    { 'Orlando Digs': 1 },
    { 'Andi Lane': 0 },
    { 'Kate Morrison': 0 },
    { 'Koray Okumus': 1 }
  ]

  const users:User[] = []

  for(let i = 0; i < 6; i++) {
    const [key, value] = Object.entries(nameAndGender[i])[0];
    const gender = value ? 'boy' : 'girl';
    users.push({
      id: i,
      name: key,
      gender,
      profileImage: `https://avatar.iran.liara.run/public/${gender}?username=${key.toLowerCase().trim().replace(/\s+/g, '-')}`
    })
  }

  return users;
}

export const activities:Activity[] = [
  {
    user: 0,
    id: 1,
    message: "You have a bug that needs attention",
    createdAt: new Date(Date.now()),
  },
  {
    user: 1,
    id: 2,
    message: "Released a new version",
    createdAt: new Date(Date.now() - 59 * 60 * 1000),
  },
  {
    user: 2,
    id: 3,
    message: "Submitted a bug",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    user: 3,
    id: 4,
    message: "Modified A data in Page X",
    createdAt: new Date(new Date().setHours(11, 59, 0, 0)),
  },
  {
    user: 4,
    id: 5,
    message: "Deleted a page in Project X",
    createdAt: new Date(new Date().setFullYear(2023, 1, 2)),
  },
]

export interface DashboardData {
  customers: {
    total: number;
    growth: number;
  };
  orders: {
    total: number;
    growth: number;
  };
  revenue: {
    total: number;
    growth: number;
  };
  growth: {
    percentage: number;
    change: number;
  };
  projectionsVsActuals: {
    months: string[];
    values: number[]; // in millions
    projectionValues: number[]; // in millions
  };
  revenueWeekly: {
    currentWeek: number;
    previousWeek: number;
    chartData: {
      months: string[];
      currentWeekLine: number[]; // in millions
      previousWeekLine: number[]; // in millions
    };
  };
  revenueByLocation: {
    locations: Array<{
      city: string;
      amount: number;
    }>;
  };
  topSellingProducts: Array<{
    name: string;
    price: number;
    quantity: number;
    amount: number;
  }>;
  totalSales: {
    segments: Array<{
      type: string;
      amount: number;
    }>;
  };
}

export const dashboardData: DashboardData = {
  customers: {
    total: 3781,
    growth: 11.01
  },
  orders: {
    total: 1219,
    growth: -0.03
  },
  revenue: {
    total: 695,
    growth: 15.03
  },
  growth: {
    percentage: 30.1,
    change: 6.08
  },
  projectionsVsActuals: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [20, 25, 22, 28, 18, 24],
    projectionValues: [22, 30, 25, 30, 24, 28],
  },
  revenueWeekly: {
    currentWeek: 58211,
    previousWeek: 68768,
    chartData: {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      currentWeekLine: [12, 18, 15, 10, 12, 22],
      previousWeekLine: [8, 16, 14, 12, 20, 18]
    }
  },
  revenueByLocation: {
    locations: [
      { city: "New York", amount: 72 },
      { city: "San Francisco", amount: 39 },
      { city: "Sydney", amount: 25 },
      { city: "Singapore", amount: 61 }
    ]
  },
  topSellingProducts: [
    {
      name: "ASOS Ridley High Waist",
      price: 79.49,
      quantity: 82,
      amount: 6518.18
    },
    {
      name: "Marco Lightweight Shirt",
      price: 128.50,
      quantity: 37,
      amount: 4754.50
    },
    {
      name: "Half Sleeve Shirt",
      price: 39.99,
      quantity: 64,
      amount: 2559.36
    },
    {
      name: "Lightweight Jacket",
      price: 20.00,
      quantity: 184,
      amount: 3680.00
    },
    {
      name: "Marco Shoes",
      price: 79.49,
      quantity: 64,
      amount: 1965.81
    }
  ],
  totalSales: {
    segments: [
      { type: "Direct", amount: 300.56 },
      { type: "Affiliate", amount: 135.18 },
      { type: "Sponsored", amount: 154.02 },
      { type: "E-mail", amount: 48.96 }
    ]
  }
};

export const orders:Order[] = [
  {
    user: {
      name: "Natali Craig",
      profile: "https://avatar.iran.liara.run/public/girl?username=natali-craig"
    },
    id: "ORD-1001",
    project: "Website Redesign",
    address: "123 Main St, New York, NY",
    date: new Date("2024-06-01"),
    status: "In Progress"
  },
  {
    user: {
      name: "Drew Cano",
      profile: "https://avatar.iran.liara.run/public/boy?username=drew-cano"
    },
    id: "ORD-1002",
    project: "Mobile App",
    address: "456 Oak Ave, San Francisco, CA",
    date: new Date("2024-06-02"),
    status: "Complete"
  },
  {
    user: {
      name: "Orlando Digs",
      profile: "https://avatar.iran.liara.run/public/boy?username=orlando-digs"
    },
    id: "ORD-1003",
    project: "E-commerce Platform",
    address: "789 Pine Rd, Sydney, AU",
    date: new Date("2024-06-03"),
    status: "Pending"
  },
  {
    user: {
      name: "Andi Lane",
      profile: "https://avatar.iran.liara.run/public/girl?username=andi-lane"
    },
    id: "ORD-1004",
    project: "Marketing Dashboard",
    address: "321 Maple St, Singapore",
    date: new Date("2024-06-04"),
    status: "Approved"
  },
  {
    user: {
      name: "Kate Morrison",
      profile: "https://avatar.iran.liara.run/public/girl?username=kate-morrison"
    },
    id: "ORD-1005",
    project: "Analytics Tool",
    address: "654 Cedar Ave, London, UK",
    date: new Date("2024-06-05"),
    status: "Rejected"
  },
  {
    user: {
      name: "Koray Okumus",
      profile: "https://avatar.iran.liara.run/public/boy?username=koray-okumus"
    },
    id: "ORD-1006",
    project: "CRM Integration",
    address: "987 Birch Rd, Berlin, DE",
    date: new Date("2024-06-06"),
    status: "In Progress"
  },
  {
    user: {
      name: "Natali Craig",
      profile: "https://avatar.iran.liara.run/public/girl?username=natali-craig"
    },
    id: "ORD-1007",
    project: "SEO Optimization",
    address: "123 Main St, New York, NY",
    date: new Date("2024-06-07"),
    status: "Complete"
  },
  {
    user: {
      name: "Drew Cano",
      profile: "https://avatar.iran.liara.run/public/boy?username=drew-cano"
    },
    id: "ORD-1008",
    project: "Landing Page",
    address: "456 Oak Ave, San Francisco, CA",
    date: new Date("2024-06-08"),
    status: "Pending"
  },
  {
    user: {
      name: "Orlando Digs",
      profile: "https://avatar.iran.liara.run/public/boy?username=orlando-digs"
    },
    id: "ORD-1009",
    project: "Payment Gateway",
    address: "789 Pine Rd, Sydney, AU",
    date: new Date("2024-06-09"),
    status: "Approved"
  },
  {
    user: {
      name: "Andi Lane",
      profile: "https://avatar.iran.liara.run/public/girl?username=andi-lane"
    },
    id: "ORD-1010",
    project: "Blog Platform",
    address: "321 Maple St, Singapore",
    date: new Date("2024-06-10"),
    status: "Rejected"
  },
  {
    user: {
      name: "Kate Morrison",
      profile: "https://avatar.iran.liara.run/public/girl?username=kate-morrison"
    },
    id: "ORD-1011",
    project: "Inventory System",
    address: "654 Cedar Ave, London, UK",
    date: new Date("2024-06-11"),
    status: "In Progress"
  },
  {
    user: {
      name: "Koray Okumus",
      profile: "https://avatar.iran.liara.run/public/boy?username=koray-okumus"
    },
    id: "ORD-1012",
    project: "HR Portal",
    address: "987 Birch Rd, Berlin, DE",
    date: new Date("2024-06-12"),
    status: "Complete"
  },
  {
    user: {
      name: "Natali Craig",
      profile: "https://avatar.iran.liara.run/public/girl?username=natali-craig"
    },
    id: "ORD-1013",
    project: "Customer Support",
    address: "123 Main St, New York, NY",
    date: new Date("2024-06-13"),
    status: "Pending"
  },
  {
    user: {
      name: "Drew Cano",
      profile: "https://avatar.iran.liara.run/public/boy?username=drew-cano"
    },
    id: "ORD-1014",
    project: "Email Campaign",
    address: "456 Oak Ave, San Francisco, CA",
    date: new Date("2024-06-14"),
    status: "Approved"
  },
  {
    user: {
      name: "Orlando Digs",
      profile: "https://avatar.iran.liara.run/public/boy?username=orlando-digs"
    },
    id: "ORD-1015",
    project: "Survey Tool",
    address: "789 Pine Rd, Sydney, AU",
    date: new Date("2024-06-15"),
    status: "Rejected"
  },
  {
    user: {
      name: "Andi Lane",
      profile: "https://avatar.iran.liara.run/public/girl?username=andi-lane"
    },
    id: "ORD-1016",
    project: "Booking System",
    address: "321 Maple St, Singapore",
    date: new Date("2024-06-16"),
    status: "In Progress"
  },
  {
    user: {
      name: "Kate Morrison",
      profile: "https://avatar.iran.liara.run/public/girl?username=kate-morrison"
    },
    id: "ORD-1017",
    project: "Chatbot",
    address: "654 Cedar Ave, London, UK",
    date: new Date("2024-06-17"),
    status: "Complete"
  },
  {
    user: {
      name: "Koray Okumus",
      profile: "https://avatar.iran.liara.run/public/boy?username=koray-okumus"
    },
    id: "ORD-1018",
    project: "API Development",
    address: "987 Birch Rd, Berlin, DE",
    date: new Date("2024-06-18"),
    status: "Pending"
  },
  {
    user: {
      name: "Natali Craig",
      profile: "https://avatar.iran.liara.run/public/girl?username=natali-craig"
    },
    id: "ORD-1019",
    project: "File Storage",
    address: "123 Main St, New York, NY",
    date: new Date("2024-06-19"),
    status: "Approved"
  },
  {
    user: {
      name: "Drew Cano",
      profile: "https://avatar.iran.liara.run/public/boy?username=drew-cano"
    },
    id: "ORD-1020",
    project: "Video Streaming",
    address: "456 Oak Ave, San Francisco, CA",
    date: new Date("2024-06-20"),
    status: "Rejected"
  },
  {
    user: {
      name: "Orlando Digs",
      profile: "https://avatar.iran.liara.run/public/boy?username=orlando-digs"
    },
    id: "ORD-1021",
    project: "Forum Platform",
    address: "789 Pine Rd, Sydney, AU",
    date: new Date("2024-06-21"),
    status: "In Progress"
  },
  {
    user: {
      name: "Andi Lane",
      profile: "https://avatar.iran.liara.run/public/girl?username=andi-lane"
    },
    id: "ORD-1022",
    project: "Learning Portal",
    address: "321 Maple St, Singapore",
    date: new Date("2024-06-22"),
    status: "Complete"
  },
  {
    user: {
      name: "Kate Morrison",
      profile: "https://avatar.iran.liara.run/public/girl?username=kate-morrison"
    },
    id: "ORD-1023",
    project: "Event Management",
    address: "654 Cedar Ave, London, UK",
    date: new Date("2024-06-23"),
    status: "Pending"
  },
  {
    user: {
      name: "Koray Okumus",
      profile: "https://avatar.iran.liara.run/public/boy?username=koray-okumus"
    },
    id: "ORD-1024",
    project: "Document Editor",
    address: "987 Birch Rd, Berlin, DE",
    date: new Date("2024-06-24"),
    status: "Approved"
  },
  {
    user: {
      name: "Natali Craig",
      profile: "https://avatar.iran.liara.run/public/girl?username=natali-craig"
    },
    id: "ORD-1025",
    project: "Photo Gallery",
    address: "123 Main St, New York, NY",
    date: new Date("2024-06-25"),
    status: "Rejected"
  },
  {
    user: {
      name: "Drew Cano",
      profile: "https://avatar.iran.liara.run/public/boy?username=drew-cano"
    },
    id: "ORD-1026",
    project: "Fitness Tracker",
    address: "456 Oak Ave, San Francisco, CA",
    date: new Date("2024-06-26"),
    status: "In Progress"
  },
  {
    user: {
      name: "Orlando Digs",
      profile: "https://avatar.iran.liara.run/public/boy?username=orlando-digs"
    },
    id: "ORD-1027",
    project: "Recipe App",
    address: "789 Pine Rd, Sydney, AU",
    date: new Date("2024-06-27"),
    status: "Complete"
  },
  {
    user: {
      name: "Andi Lane",
      profile: "https://avatar.iran.liara.run/public/girl?username=andi-lane"
    },
    id: "ORD-1028",
    project: "Travel Planner",
    address: "321 Maple St, Singapore",
    date: new Date("2024-06-28"),
    status: "Pending"
  },
  {
    user: {
      name: "Kate Morrison",
      profile: "https://avatar.iran.liara.run/public/girl?username=kate-morrison"
    },
    id: "ORD-1029",
    project: "Music Streaming",
    address: "654 Cedar Ave, London, UK",
    date: new Date("2024-06-29"),
    status: "Approved"
  },
  {
    user: {
      name: "Koray Okumus",
      profile: "https://avatar.iran.liara.run/public/boy?username=koray-okumus"
    },
    id: "ORD-1030",
    project: "News Aggregator",
    address: "987 Birch Rd, Berlin, DE",
    date: new Date("2024-06-30"),
    status: "Rejected"
  },
  {
    user: {
      name: "Natali Craig",
      profile: "https://avatar.iran.liara.run/public/girl?username=natali-craig"
    },
    id: "ORD-1031",
    project: "Weather App",
    address: "123 Main St, New York, NY",
    date: new Date("2024-07-01"),
    status: "In Progress"
  },
  {
    user: {
      name: "Drew Cano",
      profile: "https://avatar.iran.liara.run/public/boy?username=drew-cano"
    },
    id: "ORD-1032",
    project: "Expense Tracker",
    address: "456 Oak Ave, San Francisco, CA",
    date: new Date("2024-07-02"),
    status: "Complete"
  },
  {
    user: {
      name: "Orlando Digs",
      profile: "https://avatar.iran.liara.run/public/boy?username=orlando-digs"
    },
    id: "ORD-1033",
    project: "Time Management",
    address: "789 Pine Rd, Sydney, AU",
    date: new Date("2024-07-03"),
    status: "Pending"
  },
  {
    user: {
      name: "Andi Lane",
      profile: "https://avatar.iran.liara.run/public/girl?username=andi-lane"
    },
    id: "ORD-1034",
    project: "Note Taking",
    address: "321 Maple St, Singapore",
    date: new Date("2024-07-04"),
    status: "Approved"
  },
  {
    user: {
      name: "Kate Morrison",
      profile: "https://avatar.iran.liara.run/public/girl?username=kate-morrison"
    },
    id: "ORD-1035",
    project: "Mind Mapping",
    address: "654 Cedar Ave, London, UK",
    date: new Date("2024-07-05"),
    status: "Rejected"
  },
  {
    user: {
      name: "Koray Okumus",
      profile: "https://avatar.iran.liara.run/public/boy?username=koray-okumus"
    },
    id: "ORD-1036",
    project: "Kanban Board",
    address: "987 Birch Rd, Berlin, DE",
    date: new Date("2024-07-06"),
    status: "In Progress"
  },
  {
    user: {
      name: "Natali Craig",
      profile: "https://avatar.iran.liara.run/public/girl?username=natali-craig"
    },
    id: "ORD-1037",
    project: "Personal Blog",
    address: "123 Main St, New York, NY",
    date: new Date("2024-07-07"),
    status: "Complete"
  },
  {
    user: {
      name: "Drew Cano",
      profile: "https://avatar.iran.liara.run/public/boy?username=drew-cano"
    },
    id: "ORD-1038",
    project: "Portfolio Website",
    address: "456 Oak Ave, San Francisco, CA",
    date: new Date("2024-07-08"),
    status: "Pending"
  },
  {
    user: {
      name: "Orlando Digs",
      profile: "https://avatar.iran.liara.run/public/boy?username=orlando-digs"
    },
    id: "ORD-1039",
    project: "Resume Builder",
    address: "789 Pine Rd, Sydney, AU",
    date: new Date("2024-07-09"),
    status: "Approved"
  },
  {
    user: {
      name: "Andi Lane",
      profile: "https://avatar.iran.liara.run/public/girl?username=andi-lane"
    },
    id: "ORD-1040",
    project: "Job Board",
    address: "321 Maple St, Singapore",
    date: new Date("2024-07-10"),
    status: "Rejected"
  },
  {
    user: {
      name: "Kate Morrison",
      profile: "https://avatar.iran.liara.run/public/girl?username=kate-morrison"
    },
    id: "ORD-1041",
    project: "Freelance Platform",
    address: "654 Cedar Ave, London, UK",
    date: new Date("2024-07-11"),
    status: "In Progress"
  },
  {
    user: {
      name: "Koray Okumus",
      profile: "https://avatar.iran.liara.run/public/boy?username=koray-okumus"
    },
    id: "ORD-1042",
    project: "Online Store",
    address: "987 Birch Rd, Berlin, DE",
    date: new Date("2024-07-12"),
    status: "Complete"
  },
  {
    user: {
      name: "Natali Craig",
      profile: "https://avatar.iran.liara.run/public/girl?username=natali-craig"
    },
    id: "ORD-1043",
    project: "Donation Platform",
    address: "123 Main St, New York, NY",
    date: new Date("2024-07-13"),
    status: "Pending"
  },
  {
    user: {
      name: "Drew Cano",
      profile: "https://avatar.iran.liara.run/public/boy?username=drew-cano"
    },
    id: "ORD-1044",
    project: "Crowdfunding",
    address: "456 Oak Ave, San Francisco, CA",
    date: new Date("2024-07-14"),
    status: "Approved"
  },
  {
    user: {
      name: "Orlando Digs",
      profile: "https://avatar.iran.liara.run/public/boy?username=orlando-digs"
    },
    id: "ORD-1045",
    project: "Auction Site",
    address: "789 Pine Rd, Sydney, AU",
    date: new Date("2024-07-15"),
    status: "Rejected"
  }
]