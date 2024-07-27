import React, { lazy, Suspense } from 'react';

//here all import for admin screen related compoennts are needed
const AdminCustomerData = lazy(() => import("../../AdminScreen/subComponents/AdminCustomerData"));
const AdminOrderForm = lazy(() => import("../../AdminScreen/subComponents/AdminOrderForm"));
const AdminOrderWorklist = lazy(() => import("../../AdminScreen/subComponents/AdminOrderWorklist"));

function DynamicRightPanel({ renderCmp }) {
  let renderComponent;
  console.log(renderCmp)
  switch (renderCmp) {
    case 'AdminCustomerData':
      renderComponent = <AdminCustomerData />;
      break;
    case 'AdminOrderForm':
      renderComponent = <AdminOrderForm />;
      break;
    case 'AdminOrderWorklist':
      renderComponent = <AdminOrderWorklist />;
      break;
    default:
      renderComponent = <div>Select a component</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {renderComponent}
    </Suspense>
  );
}

export default DynamicRightPanel;