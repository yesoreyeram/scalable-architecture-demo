/// <reference path="../../../../node_modules/immutable/dist/immutable.d.ts"/>

import {fromJS} from 'immutable';

export interface Badge {
  id: number;
  name: string;
  description: string;
  platforms: number[];
  grades: string[];
  rank: number;
}

export interface Topic {
  id: number;
  subject: number;
  grade: string;
  category: number;
  name: string;
}

export interface Standard {
  id: number;
  topic: Topic;
  code: string;
  name: string;
  description: string;
}

export interface Question {
  id: number;
  standard: Standard;
  text: string;
  hint: string;
  right_answer: string;
  wrong_answer1: string;
  wrong_answer2: string;
  wrong_answer3: string;
  difficulty: number;
  attempts_count: number;
  correct_count: number;
  minutes_taken: number;
}

export interface TopicData {
  id: number;
  topic: Topic;
  difficulty: number;
}

export interface Customization {
  id: number;
  avatar: number;
  title: number;
}

export interface Performances {
  id: number;
  questions_count: number;
  standard: Standard;
  attempts_count: number;
  current_count: number;
  brownie_points_earned: number;
  seconds_taken: number;
  last_64_flag: number;
  daily_scores: any;
}

export interface Kid {
  id: number;
  customization: Customization;
  performances: Performances[];
  topic_data: TopicData[];
  brownie_points_total: number;
  brownie_points_available: number;
  brownie_points_free: number;
  questions_available_today: number;
  goal_badge: Badge;
  won_badges: Badge[];
  name: string;
  gender: number;
  grade: number;
  photo_time: Date;
  reminder_days: number[];
  reminder_hour: number[];
  platforms: number[];
}

export interface Configuration {
  id: number;
  country: string;
  state: string;
  city: string;
  phone_code: string;
  language: string;
}

export interface CreditCard {
  id: number;
  type: string;
  country: string;
  expiry_month: string;
  expiry_year: string;
  last_four: string;
}

export interface Parent {
  id: number;
  configuration: Configuration;
  credit_card: CreditCard;
  kids: Kid[];
  role: number;
  email: string;
  name: string;
  timezone: string;
}

const initialState: Parent = {
  id: null,
  configuration: {
    id: null,
    country: null,
    state: null,
    city: null,
    phone_code: null,
    language: null
  },
  credit_card: {
    id: null,
    type: null,
    expiry_month: null,
    expiry_year: null,
    last_four: null,
    country: null
  },
  kids: [],
  role: null,
  email: null,
  name: null,
  timezone: null
};
