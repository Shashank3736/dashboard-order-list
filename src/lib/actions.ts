'use server';

import { activities, dashboardData, getUsers, orders } from './data';
import { getReadableTime } from './utils';

export type NotificationType = {
  id: number;
  type: 'bug' | 'user' | 'subscription';
  message: string;
  createdAt: Date;
};

export type NotificationResultType = NotificationType & { time: string };
export type AcitivitiesResultType = {
  image: string;
  user: number;
  id: number;
  message: string;
  createdAt: string;
};

/**
 * Retrieves a list of notifications with human-readable time formatting.
 *
 * Each notification includes its id, type, message, creation date, and a formatted
 * time string. If the notification was created today, the time is shown as "Today, hh:mm a".
 * Otherwise, a relative time (e.g., "12 hours ago") is provided.
 *
 * @returns {Promise<Array<NotificationType & { time: string }>>}
 *   A promise that resolves to an array of notifications, each with an additional `time` property.
 */
export async function getNotifications() {
  const notifications: NotificationType[] = [
    {
      id: 1,
      type: 'bug',
      message: 'You have a bug that needs attention',
      createdAt: new Date(Date.now()),
    },
    {
      id: 2,
      type: 'user',
      message: 'New user registered',
      createdAt: new Date(Date.now() - 59 * 60 * 1000),
    },
    {
      id: 3,
      type: 'bug',
      message: 'You have a bug that needs attention',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
    {
      id: 4,
      type: 'subscription',
      message: 'Andi Lane subscribed to you',
      createdAt: new Date(new Date().setHours(11, 59, 0, 0)),
    },
  ];

  // Add human-readable time formatting
  const results = notifications.map((n) => {
    const readableTime = getReadableTime(n.createdAt);

    return {
      ...n,
      time: readableTime,
    };
  });

  return results;
}

export async function getContacts() {
  return getUsers();
}

export async function getActivities(): Promise<AcitivitiesResultType[]> {
  const users = getUsers();

  // Map activities to include user profile image instead of user id
  const activitiesWithProfile = activities.map((activity) => {
    const user = users.find((u) => u.id === activity.user);
    return {
      ...activity,
      image: user?.profileImage || '',
      createdAt: getReadableTime(activity.createdAt),
    };
  });

  return activitiesWithProfile;
}

export async function getDashboardData() {
  return dashboardData;
}

export async function getOrders() {
  return orders;
}
