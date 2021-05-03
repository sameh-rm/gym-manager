export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: <i className="far fa-tachometer-alt-slowest"></i>,
  },
  {
    title: "Members",
    icon: <i className="far fa-dumbbell"></i>,
    subitems: [
      {
        title: "New Member",
        url: "/members/new",
        icon: <i className="far fa-user-plus"></i>,
      },
      {
        title: "Members List",
        url: "/members",
        icon: <i className="fal fa-list"></i>,
      },
    ],
  },
  {
    title: "Memberships",
    icon: <i className="fal fa-id-card-alt"></i>,
    subitems: [
      {
        title: "New MemberShip",
        url: "/memberships/new",
        icon: <i className="fad fa-layer-plus"></i>,
      },
      {
        title: "MemberShip List",
        url: "/memberships",
        icon: <i className="fad fa-layer-group"></i>,
      },
    ],
  },
  {
    title: "POS",
    url: "/pos",
    icon: <i className="fal fa-cash-register"></i>,
    subitems: [
      {
        title: "Sale",
        url: "/pos/sale",
        icon: <i className="far fa-cart-plus"></i>,
      },
      {
        title: "Purchase",
        url: "/pos/purchase",
        icon: <i className="far fa-money-check-alt"></i>,
      },
    ],
  },

  {
    title: "Expenses",
    icon: <i className="far fa-coins"></i>,
    subitems: [
      {
        title: "Add Expense",
        url: "/expenses/add",
        icon: <i className="far fa-plus"></i>,
      },
      {
        title: "Expenses List",
        url: "/expenses",
        icon: <i className="far fa-receipt"></i>,
      },
    ],
  },
  {
    title: "Reports",
    icon: <i className="fal fa-sitemap"></i>,
    subitems: [
      // Lists the gym daily income Daily Courses and monthly courses
      {
        title: "Daily Income",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/income/daily",
      },
      {
        title: "Monthly Income",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/income/monthly",
      },
      {
        title: "_",
      },
      {
        title: "Gym Daily",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/gym/daily",
      },
      {
        title: "Gym Monthly",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/gym/monthly",
      },
      {
        title: "_",
      },
      // Lists the daily sales (POS)
      {
        title: "Daily Sales",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/sales/daily",
      },
      // Lists the daily Income sales and gym
      {
        title: "Monthly Sales",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/sales/monthly",
      },
      {
        title: "_",
      },

      // lists all payments including gym and sales ** adding filter
      {
        title: "Daily Expenses",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/expenses/daily",
      },
      {
        title: "Monthly Expenses",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/expenses/monthly",
      },
      {
        title: "_",
      },
      // lists all registered members
      {
        title: "Members",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/members",
      },
      // lists recent registered members
      {
        title: "Newly Registered",
        icon: <i className="fal fa-ellipsis-h-alt"></i>,
        url: "/reports/members/recent",
      },
    ],
  },
  {
    title: "Settings",
    subitems: [
      {
        title: "Settings",
        icon: <i className="far fa-cog"></i>,
        url: "/settings",
      },
      {
        title: "User List",
        icon: <i className="far fa-cog"></i>,
        url: "/users",
      },
      {
        title: "Add User",
        icon: <i className="far fa-cog"></i>,
        url: "/users/add",
      },
    ],
  },
];