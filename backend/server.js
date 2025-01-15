import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";
import multer from "multer";
import { blogRouter } from "./routers/blogRouter.js";
import { galleryRouter } from "./routers/galleryRouter.js";
import { messageRouter } from "./routers/messageRouter.js";
import { poetryRouter } from "./routers/poetryRouter.js";
import { eventRouter } from "./routers/eventRouter.js";
import { magazineRouter } from "./routers/magazineRouter.js";
import fs from "fs";
import url from "url";

const app = express();
env.config();

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    // ca: fs.readFileSync(process.env.CERTIFICATE).toString(),
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUS2Ti7kZ3mpKtNIIgmjsY9lEkmcwwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMjBjM2RmMzktYzg4Zi00OTAwLWJjYzctMTdlN2VhMmY2
ZTEyIFByb2plY3QgQ0EwHhcNMjQxMDI4MDY1MzEzWhcNMzQxMDI2MDY1MzEzWjA6
MTgwNgYDVQQDDC8yMGMzZGYzOS1jODhmLTQ5MDAtYmNjNy0xN2U3ZWEyZjZlMTIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALcEDh5Q
f8BN5CzD9z4IbXlg3/oMyGQzOcyqQpOAYpEbyaR8UnpcbMEOkUIiOb6IFzh8vI4A
WZnFKgqPPqOrMTCxiWYFFqf7cB5LUGrFX1UpHorP6/kumZ9HRSccWQ4m0h5QKoLr
H1JPUObpG+cSNzqpXC6UjAN1MPDA825xboRZGommNoWg8jQj+0sg6RbJnkRETkn+
bg6ZHrWPKM8On2sp3HIPXB7WBymu60uoJk4GiaV6hOhFNlb5j8xRsxH1AH/MfdON
NcjM4FvaoW1dIxNDdrYVyOw11cljFRh8+hCSsDiyYcKiq06/bTA/kMi8tJA7R7aJ
uVVNwjF3mVGeHgv3/LDEBGJYwdFKXkmmRNNefSLfQPQ/VvchA6lJKOtGeTujlK+C
dpZXIxBlNQXI4wMSTBGV66IeWU3V7PMaSv6YP4ysvag8TM17s9yZuqh9M8IoQ5vd
+im3Os8cBE2DW+NV5IOBtdLnQ0aj/699xFlm2aRmWofXv/kKnnMS8zdIjwIDAQAB
oz8wPTAdBgNVHQ4EFgQUJOtvfep4v2qgxkECM+/EOaH+hY4wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAGx7tgKl2Nc/iCyy
VkRiPZrHJdzMX/XD9Yr+V+avJUNm5D8B2mx96zLZIcWxowpvrWYKWmAv1uOQiNQz
M2fAaKB4wXiqdIeIGpmR3Sdr309uw+oRHLDc26/o+8pV3/K8lYj3DmJIdcwQGuoV
N3URHrS5lzBUs9vt2Y+ArdbY2SPbD52aYz/cnpoB8u5hNJc42oUh7fbbwbuvlej1
CcxRAHQlJF3W6klMfhE+pdZ5VgMVSVmnRqHcSdZEnuONJW21HcKqyv68zdpW71eX
f7oxdrOKZ/Eh6urrd1MByf6zJwn4lmMLBNNtdCMkE7Y8j5M8cXUGQmXmimBCT95h
kgGnpXIDhzHL8uOwXHzlTK41mBQnWzmcTQC0/XcMYmJyxsT4u4tJ0QVgGLl9/aLb
ELOpmj10NXurE6Q/KoZPzYKh4F+AabL0KuqCp91R9rzbFGJxP7l+QIocaDBdmGQG
QEwPxA2mK4ZLJn/pkao7m7u5yr+Um+g3fDoOhojtXku+dsLhww==
-----END CERTIFICATE-----`,
  },
};

const db = new pg.Client(config);

db.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the online PostgreSQL database");
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/blogs/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.post("/gallery/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.post("/poetry/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.post("/events/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.post("/magazine/post", upload.single("image"), (req, res, next) => {
  req.file ? console.log("File uploaded") : console.log("No file uploaded");
  next();
});

app.use("/blogs", blogRouter);
app.use("/gallery", galleryRouter);
app.use("/messages", messageRouter);
app.use("/poetry", poetryRouter);
app.use("/events", eventRouter);
app.use("/magazine", magazineRouter);

export { db };

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
