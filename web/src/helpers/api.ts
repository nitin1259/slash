import axios from "axios";

type ResponseObject<T> = {
  data: T;
  error?: string;
  message?: string;
};

export function getSystemStatus() {
  return axios.get<ResponseObject<SystemStatus>>("/api/status");
}

export function signin(email: string, password: string) {
  return axios.post<ResponseObject<User>>("/api/auth/signin", {
    email,
    password,
  });
}

export function signup(email: string, password: string) {
  return axios.post<ResponseObject<User>>("/api/auth/signup", {
    email,
    password,
    name: email,
  });
}

export function signout() {
  return axios.post("/api/auth/logout");
}

export function createUser(userCreate: UserCreate) {
  return axios.post<ResponseObject<User>>("/api/user", userCreate);
}

export function getMyselfUser() {
  return axios.get<ResponseObject<User>>("/api/user/me");
}

export function getUserList() {
  return axios.get<ResponseObject<User[]>>("/api/user");
}

export function getUserById(id: number) {
  return axios.get<ResponseObject<User>>(`/api/user/${id}`);
}

export function patchUser(userPatch: UserPatch) {
  return axios.patch<ResponseObject<User>>(`/api/user/${userPatch.id}`, userPatch);
}

export function deleteUser(userDelete: UserDelete) {
  return axios.delete(`/api/user/${userDelete.id}`);
}

export function getWorkspaceList(find?: WorkspaceFind) {
  const queryList = [];
  if (find?.creatorId) {
    queryList.push(`creatorId=${find.creatorId}`);
  }
  if (find?.memberId) {
    queryList.push(`memberId=${find.memberId}`);
  }
  return axios.get<ResponseObject<Workspace[]>>(`/api/workspace?${queryList.join("&")}`);
}

export function getWorkspaceById(workspaceId: WorkspaceId) {
  return axios.get<ResponseObject<Workspace>>(`/api/workspace/${workspaceId}`);
}

export function createWorkspace(create: WorkspaceCreate) {
  return axios.post<ResponseObject<Workspace>>("/api/workspace", create);
}

export function patchWorkspace(patch: WorkspacePatch) {
  return axios.patch<ResponseObject<Workspace>>(`/api/workspace/${patch.id}`, patch);
}

export function deleteWorkspaceById(workspaceId: WorkspaceId) {
  return axios.delete(`/api/workspace/${workspaceId}`);
}

export function upsertWorkspaceUser(upsert: WorkspaceUserUpsert) {
  return axios.post<ResponseObject<WorkspaceUser>>(`/api/workspace/${upsert.workspaceId}/user`, upsert);
}

export function getWorkspaceUserList(workspaceUserFind?: WorkspaceUserFind) {
  return axios.get<ResponseObject<WorkspaceUser[]>>(`/api/workspace/${workspaceUserFind?.workspaceId}/user`);
}

export function getWorkspaceUser(workspaceUserFind?: WorkspaceUserFind) {
  return axios.get<ResponseObject<WorkspaceUser>>(
    `/api/workspace/${workspaceUserFind?.workspaceId}/user/${workspaceUserFind?.userId ?? ""}`
  );
}

export function deleteWorkspaceUser(workspaceUserDelete: WorkspaceUserDelete) {
  return axios.delete(`/api/workspace/${workspaceUserDelete.workspaceId}/user/${workspaceUserDelete.userId}`);
}

export function getShortcutList(shortcutFind?: ShortcutFind) {
  const queryList = [];
  if (shortcutFind?.creatorId) {
    queryList.push(`creatorId=${shortcutFind.creatorId}`);
  }
  if (shortcutFind?.workspaceId) {
    queryList.push(`workspaceId=${shortcutFind.workspaceId}`);
  }
  return axios.get<ResponseObject<Shortcut[]>>(`/api/shortcut?${queryList.join("&")}`);
}

export function getShortcutWithNameAndWorkspaceName(workspaceName: string, shortcutName: string) {
  return axios.get<ResponseObject<Shortcut>>(`/api/workspace/${workspaceName}/shortcut/${shortcutName}`);
}

export function createShortcut(shortcutCreate: ShortcutCreate) {
  return axios.post<ResponseObject<Shortcut>>("/api/shortcut", shortcutCreate);
}

export function patchShortcut(shortcutPatch: ShortcutPatch) {
  return axios.patch<ResponseObject<Shortcut>>(`/api/shortcut/${shortcutPatch.id}`, shortcutPatch);
}

export function deleteShortcutById(shortcutId: ShortcutId) {
  return axios.delete(`/api/shortcut/${shortcutId}`);
}
