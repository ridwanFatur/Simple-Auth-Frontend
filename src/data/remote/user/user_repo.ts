import { apiClient } from "@/data/helpers/clients/api_client";
import { UserModel } from "@/domain/models/user/user_model";

const UserRepo = {
  getUser: async () => {
    return await apiClient<UserModel>({
      path: "/api/v1/user/",
      method: "get",
    });
  },
};

export default UserRepo;
