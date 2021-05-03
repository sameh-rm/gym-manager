import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // عرض واجهة مستخدم بديلة
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // تستطيع تسجيل الخطأ إلى خدمة التبليغ عن الأخطاء
    // logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // تستطيع تصيير أي واجهة مستخدم بديلة مخصصة
      return <h1>حدث خطأ ما.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
