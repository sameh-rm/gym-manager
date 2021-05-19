const x = {
  "Add Member": {
    address: "",
    city: "",
    center: "",
    governorate: "",
    name: "",
    phone: "",
    nationalId: "",
    age: "",
    tall: "",
    weight: "",
    image: "",
    subscribtions: [
      {
        user: {
          // type: mongoose.Schema.Types.ObjectId,
          ref: "Membership",
        },
        type: "Memebership" || "course",
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        period: {
          type: Number,
          required: true,
        },
        plan: {
          type: String,
          required: true,
          //"month" || "day",
        },
        price: {
          type: Number,
          required: true,
          default: 0.0,
        },
        paid: {
          type: Number,
          required: true,
          default: 0.0,
        },
        isActive: {
          type: Boolean,
          required: true,
          default: true,
        },
        startedAt: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        endsAt: {
          type: Date,
          required: true,
        },
        confirmed: {
          type: Boolean,
          required: true,
          default: false,
        },
        paymentStatus: {
          // paid, notPaid,
          type: Boolean,
          required: true,
          default: true,
        },
      },
    ],
    memberships: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        period: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          default: 0.0,
        },
        paid: {
          type: Number,
          required: true,
          default: 0.0,
        },
        isActive: {
          type: Boolean,
          required: true,
          default: true,
        },
        startedAt: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        endsAt: {
          type: Date,
          required: true,
        },
        confirmed: {
          type: Boolean,
          required: true,
          default: false,
        },
        paymentStatus: {
          // paid, notPaid,
          type: Boolean,
          required: true,
          default: true,
        },
      },
    ],
    courses: [
      {
        name: {
          type: String,
          required: true,
        },
        user: {
          // type: mongoose.Schema.Types.ObjectId,
          ref: "Membership",
        },
        period: {
          type: Number,
          required: true,
          default: 1,
        },
        plan: {
          //Daily or monthly
          type: String,
          required: true,
          default: "شهرى",
        },
        startedAt: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        endsAt: {
          type: Date,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        paid: {
          type: Number,
          required: true,
          default: 0,
        },
        confirmed: {
          type: Boolean,
          required: true,
          default: false,
        },
        status: {
          type: Boolean,
          required: true,
          default: true,
        },
      },
    ],
  },
};
