/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { MyElement } from "../src/my-element";
import { fixture, assert } from "@open-wc/testing";
import { Router } from "@vaadin/router";
import { html } from "lit/static-html.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("my-element", () => {
  let el = null;

  beforeEach(async () => {
    el = await fixture(html`<my-element></my-element>`);

    await el.updateComplete;
    await sleep(250);
  });

  it("is defined", () => {
    const el = document.createElement("my-element");
    assert.instanceOf(el, MyElement);
  });

  it("should navigate correctly", async () => {
    const addBtn = el.shadowRoot
      .querySelector("custom-navbar")
      .shadowRoot.querySelector("#add-btn");

    addBtn.click();
    await el.updateComplete;
    await sleep(100);
    assert.equal(window.location.pathname, "/add");

    const homeBtn = el.shadowRoot
      .querySelector("custom-navbar")
      .shadowRoot.querySelector("#home-btn");
    homeBtn.click();
    await el.updateComplete;
    await sleep(100);
    assert.equal(window.location.pathname, "/");
  });

  it("should change language properly", async () => {
    const langBtnEn = el.shadowRoot
      .querySelector("custom-navbar")
      .shadowRoot.querySelector("#lang-btn-en");

    langBtnEn.click();
    await el.updateComplete;
    await sleep(100);

    assert.equal(el.shadowRoot.querySelector("custom-navbar").lang, "en");

    const langBtnTr = el.shadowRoot
      .querySelector("custom-navbar")
      .shadowRoot.querySelector("#lang-btn-tr");

    langBtnTr.click();
    await el.updateComplete;
    await sleep(100);

    assert.equal(el.shadowRoot.querySelector("custom-navbar").lang, "tr");
  });

  it("should add employee", async () => {
    const addBtn = el.shadowRoot
      .querySelector("custom-navbar")
      .shadowRoot.querySelector("#add-btn");

    addBtn.click();
    await el.updateComplete;
    await sleep(100);

    const addPage = el.shadowRoot.querySelector("#outlet > add-employee");

    const form = addPage.shadowRoot.querySelector("form");

    const nameInput = addPage.shadowRoot.getElementById("firstName");
    const surnameInput = addPage.shadowRoot.getElementById("lastName");
    const emailInput = addPage.shadowRoot.getElementById("email");
    const phoneInput = addPage.shadowRoot.getElementById("phoneNumber");

    const submitBtn = addPage.shadowRoot.querySelector("#submit-btn");

    nameInput.value = "John";
    surnameInput.value = "Doe";
    emailInput.value = "doganefe@yahoo.com";
    phoneInput.value = "+905425089494";

    assert.equal(form.checkValidity(), true);

    submitBtn.click();
    await el.updateComplete;
    await sleep(100);

    assert.equal(window.location.pathname, "/");
  });

  it("should edit employee", async () => {
    const employeeList = el.shadowRoot
      .querySelector("home-page")
      .shadowRoot.querySelector("employee-list");

    const editBtn = employeeList.shadowRoot.querySelector('[name="edit-btn"]');

    editBtn.click();
    await el.updateComplete;
    await sleep(100);

    const editPage = el.shadowRoot.querySelector("#outlet > edit-employee");

    const form = editPage.shadowRoot.querySelector("form");

    const nameInput = editPage.shadowRoot.getElementById("firstName");
    const surnameInput = editPage.shadowRoot.getElementById("lastName");
    const departmentInput = editPage.shadowRoot.getElementById("department");

    nameInput.value = "NewName";
    surnameInput.value = "NewSurname";
    departmentInput.value = "Tech";

    assert.equal(form.checkValidity(), true);

    const submitBtn = editPage.shadowRoot.querySelector("#submit-btn");
    submitBtn.click();

    await el.updateComplete;
    await sleep(100);

    assert.equal(window.location.pathname, "/");
  });

  it("should render employee list on different display modes", async () => {
    const homeBtn = el.shadowRoot
      .querySelector("custom-navbar")
      .shadowRoot.querySelector("#home-btn");

    homeBtn.click();
    await el.updateComplete;
    await sleep(100);

    const homePage = el.shadowRoot.querySelector("#outlet > home-page");

    const tableBtn = homePage.shadowRoot.querySelector("#table-btn");

    const listBtn = homePage.shadowRoot.querySelector("#list-btn");

    tableBtn.click();

    await el.updateComplete;
    await sleep(100);

    assert.equal(homePage.displayMode, "table");

    listBtn.click();

    await el.updateComplete;
    await sleep(100);

    assert.equal(homePage.displayMode, "list");
  });

  it("should open not found page on wrong path", async () => {
    Router.go("/wrong-path");
    await el.updateComplete;
    await sleep(100);

    const notFoundPage = el.shadowRoot.querySelector(
      "#outlet > not-found-page"
    );

    assert.isTrue(notFoundPage !== null);
  });
});
