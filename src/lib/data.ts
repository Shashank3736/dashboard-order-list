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
  user: number;
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