import moment from "moment";
/**
 *
 * @param coursesList list of courses
 * @returns a list of select options
 */
export const coursesToOptions = (coursesList) => {
  const options = [];

  coursesList.forEach((course) =>
    options.push({ value: course, label: course.name })
  );
  return options;
};
/**
 *
 * @param options list of select options [{label:label,value:value},]
 * @returns a list of courses
 */
export const optionsToCourses = (options) => {
  const courses = [];
  const startDate = moment();

  options.forEach((option) => {
    option.value.period = option.value.period ? option.value.period : 1;
    option.value.plan = option.value.plan ? option.value.plan : "شهرى";
    const courseEndDate = moment(startDate).add(
      option.value.period,
      option.value.plan === "شهرى" ? "month" : "day"
    );
    courses.push({
      ...option.value,
      course: option.value._id,
      price:
        option.value.plan === "شهرى"
          ? option.value.monthlyPrice * option.value.period
          : option.value.dailyPrice * option.value.period,
      endsAt: courseEndDate.substring(0, 10),
    });
  });
  console.log("optionsToCourses", courses);
  return courses;
};
export const buildSubscriptions = (membership, courses) => {
  const subs = [];
  if (membership) {
    subs.push(...toSubscription(membership));
  }
  if (courses) {
    subs.push(...toSubscription(courses));
  }
  return subs;
};
/**
 * takes a membership object loops throgh its courses and returns courses list
 * @param membership a membership object
 * @returns a list of courses
 */
export const optionsToMemberShipCourses = (membership) => {
  const outCourses = [];
  const startDate = moment();
  const endDate = moment(startDate).add(membership.period, "month");
  membership.endsAt = endDate.substring(0, 10);
  membership.courses &&
    memberCourses(membership.courses, outCourses, membership);

  // membership.courses.forEach((course) => {
  //   const courseEndDate = moment(startDate).add(
  //     course.period,
  //     course.plan === "شهرى" ? "month" : "day"
  //   );
  //   courses.push({
  //     ...course,
  //     membership: membership._id,
  //     price: course.plan === "شهرى" ? course.monthlyPrice : course.dailyPrice,
  //     ends_at: courseEndDate,
  //   });
  // });
  return outCourses;
};

export const memberCourses = (courses, outCourses, membership) => {
  const startDate = moment();

  courses.forEach((course) => {
    const courseEndDate = moment(startDate).add(
      course.period,
      course.plan === "شهرى" ? "month" : "day"
    );
    membership
      ? outCourses.push({
          ...course,
          membership: membership._id,
          price:
            course.plan === "شهرى"
              ? course.monthlyPrice * course.period
              : course.dailyPrice * course.period,
          endsAt: courseEndDate.substring(0, 10),
        })
      : outCourses.push({
          ...course,
          price:
            course.plan === "شهرى"
              ? course.monthlyPrice * course.period
              : course.dailyPrice * course.period,
          endsAt: courseEndDate.substring(0, 10),
        });
  });
  return outCourses;
};

export const toSubscription = (target) => {
  const out = [];
  const startDate = moment();
  if (Array.isArray(target)) {
    target.forEach((course) => {
      const courseEndDate = moment(startDate).add(course.period, "month");
      course.membership ??
        out.push({
          ...course,
          type: "Course",
          price: course.monthlyPrice,
          endsAt: courseEndDate.substring(0, 10),
        });
    });
  } else {
    const courseEndDate = moment(startDate).add(target.period, "month");
    target &&
      out.push({
        ...target,
        type: "Membership",
        plan: "شهرى",
        endsAt: courseEndDate.substring(0, 10),
      });
  }

  return out;
};
