/*
 * Copyright (c) 2022 Suhila Ahmed - ABN AMRO.
 *
 * Unauthorized copying of this file via any medium IS STRICTLY PROHIBITED.
 * Proprietary and confidential.
 *
 * The above copyright notice shall be included in all copies or
 * substantial portions of the Software.
 */

/*
 * Module dependencies
 */
import axios from "axios";
import { privateToken } from "../../utils/config";
import { IssuesApi } from "./issues";

/*
 * Module declarations
 */

interface AxiosConfig {
  headers?: { [key: string]: string };
}

/*
 * Module
 */
export class Api {
  public accessToken: string;

  public issue = new IssuesApi(this);

  public async get<T>(url: string, config?: AxiosConfig): Promise<T> {
    return this.doRequest(url, "GET", config);
  }

  public async getUnAuthorized<T>(
    url: string,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doUnAuthorizedRequest(url, "GET", config);
  }

  public async post<T, U>(
    url: string,
    data?: U,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doRequest(url, "POST", config, data);
  }

  public async postUnAuthorized<T, U>(
    url: string,
    data?: U,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doUnAuthorizedRequest(url, "POST", config, data);
  }

  public async put<T, U>(
    url: string,
    data?: U,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doRequest(url, "PUT", config, data);
  }

  public async putUnAuthorized<T, U>(
    url: string,
    data?: U,
    config?: AxiosConfig
  ): Promise<T> {
    return this.doUnAuthorizedRequest(url, "PUT", config, data);
  }

  public async delete<T, U>(url: string, config?: AxiosConfig): Promise<T> {
   return this.doRequest(url, "DELETE", config);
  }

  public async deleteUnAuthorized<T,U>(url: string, config?: AxiosConfig): Promise<T> {
    return this.doUnAuthorizedRequest(url, "DELETE", config);
  }

  public async readById<T extends { id: number }>(
    callback: () => Promise<T[]>,
    id: number
  ): Promise<T> {
    const data = await callback();
    const found = data.find(({ id: foundId }) => foundId === id);

    if (typeof found === "undefined") {
      throw new Error(`Unable to find issue with id:  ${id}`);
    }
    return found;
  }

  private async doRequest<T, U>(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT",
    config: AxiosConfig,
    data?: U
  ): Promise<T> {
    const { data: response }: { data: T } = await axios({
      method,
      url,
      data,
      headers: { Authorization: `Bearer ${privateToken}`, ...config?.headers },
    }).then(
      (body) => body,
      (err) => {
        throw new Error(`${method} request failed with error: ${err.message}`);
      }
    );

    return response;
  }

  private async doUnAuthorizedRequest<T, U>(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT",
    config: AxiosConfig,
    data?: U
  ): Promise<T> {
    const { data: response }: { data: T } = await axios({
      method,
      url,
      data,
      headers: { ...config?.headers },
    }).then(
      (body) => body,
      (err) => {
        throw new Error(`${method} request failed with error: ${err.message}`);
      }
    );

    return response;
  }
}

/*
 * Module exports
 */
export { IssuesApi };
