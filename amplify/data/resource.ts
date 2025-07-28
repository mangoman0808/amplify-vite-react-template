import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below defines a Todo database model, which is used to store
todos Amplify Gen 2 provides a client that is type-safe from to the client
to the database.
=========================================================================*/
const schema = a.schema({
  Member: a.model({
    name: a.string(),
    email: a.email(),
    phone: a.phone(),
    status: a.string(), // "Active", "Inactive"
  }),
  Group: a.model({
    name: a.string(),
    description: a.string(),
    leader: a.string(),
  }),
  Event: a.model({
    name: a.string().required(),
    description: a.string(),
    date: a.datetime().required(),
    location: a.string(),
  }),
  Donation: a.model({
    memberName: a.string().required(),
    amount: a.float().required(),
    fund: a.string(),
    date: a.datetime().required(),
  }),
  Task: a.model({
    title: a.string().required(),
    description: a.string(),
    status: a.string(), // "To Do", "In Progress", "Complete"
    dueDate: a.date(),
    assignedTo: a.string(),
  }),
  Devotional: a.model({
    title: a.string().required(),
    description: a.string(),
    author: a.string(),
  }),
  Ministry: a.model({
    name: a.string().required(),
    description: a.string(),
    lead: a.string(),
  })
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
