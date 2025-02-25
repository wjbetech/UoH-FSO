const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, content, url) => {
  await page.getByRole("button", { name: "+ New Blog" }).click();
  console.log(content);
  await page.getByTestId("title").fill(title);
  await page.getByTestId("content").fill(content);
  await page.getByTestId("url").fill(url);
  await page.getByRole("button", { name: "Add Blog" }).click();
  await page.getByRole("button", { name: "Cancel" }).click();
};

export default { loginWith, createBlog };
