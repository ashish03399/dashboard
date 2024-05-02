import { render, screen } from "@testing-library/react";

const AllTheProviders = ({ children }) => {
  return <div>{children}</div>;
};
const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";

export { customRender as render };
