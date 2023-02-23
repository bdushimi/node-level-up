import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "No title book",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "No title book",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user tries to updated somebody's article", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "zxcvbn",
      price: 30,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "updated",
      price: 15,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const jwt_token = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", jwt_token)
    .send({
      title: "zxcvbn",
      price: 30,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", jwt_token)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", jwt_token)
    .send({
      title: "Title is fine",
      price: -20,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const jwt_token = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", jwt_token)
    .send({
      title: "zxcvbn",
      price: 30,
    });

  const updatedRes = await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", jwt_token)
    .send({
      title: "zxcvbn_updated",
      price: 20,
    })
    .expect(200);

    expect(updatedRes.body.title).toEqual('zxcvbn_updated')
    expect(updatedRes.body.price).toEqual(20)
});
