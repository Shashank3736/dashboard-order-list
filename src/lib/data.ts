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