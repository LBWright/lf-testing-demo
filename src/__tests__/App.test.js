// axios.get.mockResolvedValue(resp);
// axios.get.mockImplementation(() => Promise.resolve(resp))

import React from "react";
import { mount } from "enzyme";
import App from "../App";

describe("<App />", () => {
  it("should render without crashing", () => {
    const app = mount(<App />);
    expect(app).toBeTruthy();
  });

  it("should not render if user not logged in", () => {
    const app = mount(<App />);
    const element = app.find(".login");
    expect(element.exists()).toBeFalsy();
  });

  it("should render submit stuff if user is logged in", () => {
    const mockRequest = jest.fn(() => true);

    const app = mount(<App submitRequest={mockRequest} />);
    const usernameInput = app.find("#username");
    const passwordInput = app.find("#password");
    const form = app.find("form");
    const event = {
      target: {
        value: "michael",
        name: ""
      }
    };
    usernameInput.simulate("change", event);
    passwordInput.simulate("change", { target: { value: "1234567890" } });
    form.simulate("submit");

    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(mockRequest).toHaveBeenCalledWith({
      username: "michael",
      password: "1234567890"
    });
  });

  it("should not submit api if user creds are not right", () => {
    const mockRequest = jest.fn(() => true);
    const app = mount(<App submitRequest={mockRequest} />);
    const usernameInput = app.find("#username");
    const passwordInput = app.find("#password");
    const form = app.find("form");
    const event = {
      target: {
        value: "mi",
        name: ""
      }
    };
    usernameInput.simulate("change", event);
    passwordInput.simulate("change", { target: { value: "1234567890" } });
    form.simulate("submit");

    expect(mockRequest).toHaveBeenCalledTimes(0);
  });
  it("should render logged in if true", () => {
    const mockRequest = jest.fn(() => true);
    const app = mount(<App submitRequest={mockRequest} />);
    const usernameInput = app.find("#username");
    const passwordInput = app.find("#password");
    const form = app.find("form");
    const event = {
      target: {
        value: "michael",
        name: ""
      }
    };
    usernameInput.simulate("change", event);
    passwordInput.simulate("change", { target: { value: "1234567890" } });
    form.simulate("submit");

    const element = app.find(".login");
    expect(element.exists()).toBeTruthy();
  });
  it("should catch error", () => {
    const mockRequest = jest.fn(() => {
      throw Error("Not logged in");
    });
    const app = mount(<App submitRequest={mockRequest} />);
    const usernameInput = app.find("#username");
    const passwordInput = app.find("#password");
    const form = app.find("form");
    const event = {
      target: {
        value: "michael",
        name: ""
      }
    };
    usernameInput.simulate("change", event);
    passwordInput.simulate("change", { target: { value: "1234567890" } });
    form.simulate("submit");

    const element = app.find(".login");
    expect(element.exists()).toBeFalsy();
    const error = app.find(".error");
    expect(error.exists()).toBeTruthy();
  });
});
