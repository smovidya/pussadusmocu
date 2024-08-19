import { type NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "calendar-pussadusmocu@cryptic-ground-432818-s9.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDPRkCI7VenvJ7G\njw+q3tmKC7xoMNjlc+YgJqxDh6POqNir1L/nmRjKwL+6vPbqBBFRarFQdwLBgARV\n2AemrZ9Z3Ur44i9YtgAoClW+SPNpp4ucfPxL6OSQDXOLD4z+MNSN8jMHxXnlyG9I\nzVndRy6A+0kH/aq62edLJZIYkMRQbt9uz6xplMuZt87shE5lze9Hzp8bBLcXntSj\nuiNusPVoiHMzR3/XgfmW/BvlJNvzYvp3hsGsT4G1BfnO5yM7tIZJFnR5vXJaguYJ\n4C4wfX/hFJFTtF+pbo0Nb2rCv8zU84c4HhAw4R3nGX7DZdl7l0PJPXDRo2YDkSc0\nfHu1twVbAgMBAAECggEABfu6rYPgcGShrAysK0a56TdpLb7J5rxqQQpXawRK270v\nCALLtAqiLGl/qgsou4ejh6yjSAsvcVjZ3IUwb1olYUmMj6kD1zU7GuzKyIPq7Dqx\nwoeEcZ0xn+DrhsZLpSN8DJ7tudne/h2Y7MqUv1j92YD80jYQjB/x1879Vn0zVY5Y\ncyxHUuIcjnM0gjVuADtCBi3WUc9dhkHeS2YPLHNemTslulaDBlyDtRTKDOM3ai5d\nUo5Wcn+3g/a23Ot1RlSLWD9I5G/3QUbAHuOxM2Vt8h74F4H+AZHUd0SvI7b4O0oe\nK+o6HOCS+p7Pp7rbABrCDVjraMtszlwDhZLYV5ruuQKBgQD5XcwbAtFb/oyMzmCP\nuycwn44c6VcecKHCl/vr0YxVAXvlNoq8rb1KouYnlK9tut/CAMLz1zIqMz5bGSPN\ndbW4yb5+GQTmPC4uA3z3lOU81k8JT7ojBypAAwsWjswFs2hSk+GF+MIz8QB0Mjwl\nmek3MdvTCyJqLFlVVWk1M1Ck0wKBgQDUyc41NIBZRS8Ng1f4zyb9+OXj9ttyUWoE\ndJEletWA8y7iz7Yme0URnDgsEGq+nSERrvIJkzzHZBGeFTtb2KYOI+VZ8TFLBSNu\nhzDim7CeN6Qlgb6gjuSxkaUdJFpyXTHJtoSpMWt0ugWy1Ht+ezV1j8jlsNSHfvg8\nd8zagmhoWQKBgQC/yC6oe3NOoCeyRyqmgBZ049FlVORGqfMOeNssE14tJlYGA/uR\nfsF9PGlr+YMuDjH2v6Uv6cpQAFctstkBNE1NUANscYt+ErylcNNUijP/pQbmL2YF\neIY68tw9PheVLtTF5avl4Fpjni9uLhBqDsP5SiQ5XG/cXj1aTrT6UHvuNwKBgGuL\nj2f+n/v+Znia8IR1Fkz4ViBwbJsLoNydmZpqyavBvOmvd21dkhwDa7SBm6G5QrRw\nSi4it25DGlBehMC3771n0QwzRemXsD+1njR54bslfhXizFjTv6wrY1smO3xfs8Ey\nOTxWGOxG9IhcsgnL9cn0IOJODCxrNMVC+0tY67IJAoGBALb9QOJH5Kf9HTrKcuWv\nEG/OfryxxZZCdDdt7MCc65AB46OpJ3yP4f4LOBp/x3HCDd878xFak8s+AWZ8NCsq\nrUfj4Cexb6TLn5njuoficEjH8A72rFcmlOkJLS+0pXlxPOKnZTTD0A3vhAO9CLST\ndEr6F676WUlzS56HnrAZC4gO\n-----END PRIVATE KEY-----\n",
  },
  scopes: "https://www.googleapis.com/auth/calendar",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGoogleCalendar = (client: any) =>
  google.calendar({
    version: "v3",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    auth: client,
  });

export async function GET(_req: NextRequest) {
  try {
    const client = await auth.getClient();
    const calendar = getGoogleCalendar(client);
    console.log("Connected to Google client 🚀");
    const data = await calendar.calendarList.list();
    return NextResponse.json({ calendar: data.data});
  } catch (error) {
    console.error("Error connecting to Google client: ", error);
    return NextResponse.error();
  }
}