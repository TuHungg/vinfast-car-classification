"use client";

import styles from "./page.module.css";
import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export default function Home() {
  const [image, setImage] = useState<any>(null);
  const [resultPredict, setResultPredict] = useState<any>();
  console.log(resultPredict);


  const getFileInfo = (event: any) => {
    const file = event.target.files[0];

    setImage(file);
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setImageUrl(reader.result);
    // };
    // reader.readAsDataURL(file);
  };

  const handleSendUrl = async () => {
    if (image) {
      try {
        await axios
          .post(`${API_URL}/predict-url`, {
            url_image: image,
          })
          .then((res) => {

            if (res.data.error) {
              alert('Url image error!')
              window.location.reload();
            }

            if (!res.data.error) {
              setResultPredict(res.data);
            }
          });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        await axios
          .post(`${API_URL}/predict`, formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            setResultPredict(res.data);
          });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h3>Quick Test</h3>
      </div>

      <div className={styles.center}>
        <div className={styles.block}>
          <div className={styles.block__image}>
            {image != null ? (
              typeof image?.name === "undefined" ? (
                <img src={`${image}`} alt="image-pre" style={{ width: "700px", height: "500px" }} />
              ) : (
                <img
                  src={`${URL.createObjectURL(image)}`}
                  alt="image-pre"
                  style={{ width: "700px", height: "500px" }}
                />
              )
            ) : (
              <img
                src={`https://image.freepik.com/free-psd/photo-icon-template_348-292935616.jpg`}
                alt="image-pre"
                style={{ width: "700px", height: "500px" }}
              />
            )}
          </div>

          <div className={styles.block_form} style={{ marginLeft: 50 }}>
            <p>
              <b>Image URL</b>{" "}
            </p>
            <div className={styles.block_form__input__url}>
              <input type="text" onChange={(e) => setImage(e.target.value)} />
              <button type="submit" onClick={handleSendUrl}>
                <i style={{ alignItems: "center" }}>→</i>
              </button>
            </div>

            <br />
            <p>
              <b>or</b>
            </p>
            <form action="form" onSubmit={handleSubmit}>
              <input type="file" onChange={getFileInfo} />
              <button
                type="submit"
                // disabled={!selectedFile}
                style={{ margin: 8 }}
              >
                <p style={{ color: 'black' }}>
                  Upload image
                </p>
              </button>
              <button onClick={() => setImage(null)} style={{ margin: 8 }}>
                <p style={{ color: 'black' }}>
                  Remove image
                </p>
              </button>
            </form>

            <p>File formats accepted: jpg, png, bmp.</p>
            <p>File size should not exceed: 4mb.</p>
            <br />
            <p>
              <b>Using model trained in</b>
            </p>

            <form style={{ marginTop: 8, marginBottom: 8 }}>
              <label htmlFor="">
                <b>Interation</b>
              </label>
              <br />
              <select name="interation" id="interation">
                <option value="Interation">Interation</option>
                <option value="Interation">Interation</option>
                <option value="Interation">Interation</option>
              </select>
            </form>

            <p style={{ marginTop: 100 }}>
              <b>Predictions ❓</b>
            </p>
            <table id="table-pre">
              <tbody>
                <tr>
                  <th>Label</th>
                  <th>Score</th>
                </tr>

                {
                  resultPredict?.map((item: any) => (
                    <tr>
                      <td>
                        {item.label}
                      </td>
                      <td>
                        {item?.score?.toString().slice(0, 5)}
                      </td>
                    </tr>
                  )
                  )
                }


              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className={styles.grid}></div> */}
    </main>
  );
}
