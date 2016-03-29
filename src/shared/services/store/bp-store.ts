/// <reference path="../../../../node_modules/immutable/dist/immutable.d.ts"/>

import {fromJS, Map} from 'immutable';
import {AdaptClass} from 'data-adapter/dist/lib/index';
import {toSnakeCase} from '../../utils/name-formatter.util';

const name = (obj: Object, name: string) => toSnakeCase(name);

@AdaptClass({ name })
export class Badge {
  id: number;
  name: string;
  description: string;
  platforms: number[];
  grades: string[];
  rank: number;
}

@AdaptClass({ name })
export class Topic {
  id: number;
  subject: number;
  grade: string;
  category: number;
  name: string;
}

@AdaptClass({ name })
export class Standard {
  id: number;
  topic: Topic;
  code: string;
  name: string;
  description: string;
}

@AdaptClass({ name })
export class Question {
  id: number;
  standard: Standard;
  text: string;
  hint: string;
  rightAnswer: string;
  wrongAnswer1: string;
  wrongAnswer2: string;
  wrongAnswer3: string;
  difficulty: number;
  attemptsCount: number;
  correctCount: number;
  minutesTaken: number;
}

@AdaptClass({ name })
export class TopicData {
  id: number;
  topic: Topic;
  difficulty: number;
}

@AdaptClass({ name })
export class Customization {
  id: number;
  avatar: number;
  title: number;
}

@AdaptClass({ name })
export class Performances {
  id: number;
  questionsCount: number;
  standard: Standard;
  attemptsCount: number;
  currentCount: number;
  browniePointsEarned: number;
  secondsTaken: number;
  last64Flag: number;
  dailyScores: any;
}

@AdaptClass({ name })
export class Kid {
  id: number;
  customization: Customization;
  performances: Performances[];
  topicData: TopicData[];
  browniePointsTotal: number;
  browniePointsAvailable: number;
  browniePointsFree: number;
  questionsAvailableToday: number;
  goalBadge: Badge;
  wonBadges: Badge[];
  name: string;
  gender: number;
  grade: number;
  photoTime: Date;
  reminderDays: number[];
  reminderHour: number[];
  platforms: number[];
}

@AdaptClass({ name })
export class Configuration {
  id: number;
  country: string;
  state: string;
  city: string;
  phoneCode: string;
  language: string;
}

@AdaptClass({ name })
export class CreditCard {
  id: number;
  type: string;
  country: string;
  expiryMonth: string;
  expiryYear: string;
  lastFour: string;
}

@AdaptClass({ name })
export class Parent {
  id: number;
  token: string;
  isLogged: boolean;
  configuration: Configuration;
  creditCard: CreditCard;
  kids: Kid[];
  role: number;
  email: string;
  name: string;
  timezone: string;
}

export class Teacher {}

export class Guest {}

export class App {
  guest: Guest;
  parent: Parent;
  teacher: Teacher;
}

export const initialState: Map<string, Object> = fromJS({
  guest: {},
  parent: {
    id: null,
    isLogged: false,
    token: null,
    configuration: null,
    creditCard: {
      country: 'bg',
      expiryMonth: '11',
      expiryYear: '2018',
      lastFour: '1231',
      type: 'visa',
      id: 1
    },
    kids: null,
    role: 1,
    email: 'foo@bar.baz',
    name: 'Foobar',
    timezone: 'PST'
  },
  teacher: null
});
