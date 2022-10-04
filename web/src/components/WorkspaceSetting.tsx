import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWorkspaceUser } from "../helpers/api";
import useLoading from "../hooks/useLoading";
import { workspaceService } from "../services";
import { useAppSelector } from "../store";
import { unknownWorkspace, unknownWorkspaceUser } from "../store/modules/workspace";
import { showCommonDialog } from "./Alert";
import toastHelper from "./Toast";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";

interface Props {
  workspaceId: WorkspaceId;
}

interface State {
  showEditWorkspaceDialog: boolean;
}

const WorkspaceSetting: React.FC<Props> = (props: Props) => {
  const { workspaceId } = props;
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user) as User;
  const [state, setState] = useState<State>({
    showEditWorkspaceDialog: false,
  });
  const { workspaceList } = useAppSelector((state) => state.workspace);
  const loadingState = useLoading();
  const workspace = workspaceList.find((workspace) => workspace.id === workspaceId) ?? unknownWorkspace;
  const workspaceUser = workspace.workspaceUserList.find((workspaceUser) => workspaceUser.userId === user.id) ?? unknownWorkspaceUser;

  useEffect(() => {
    const workspace = workspaceService.getWorkspaceById(workspaceId);
    if (!workspace) {
      toastHelper.error("workspace not found");
      return;
    }

    loadingState.setFinish();
  }, []);

  const handleEditWorkspaceButtonClick = () => {
    setState({
      ...state,
      showEditWorkspaceDialog: true,
    });
  };

  const handleEditWorkspaceDialogConfirm = async () => {
    setState({
      ...state,
      showEditWorkspaceDialog: false,
    });
    const workspace = await workspaceService.fetchWorkspaceById(workspaceId);
    navigate(`/${workspace.name}#setting`);
  };

  const handleDeleteWorkspaceButtonClick = () => {
    showCommonDialog({
      title: "Delete Workspace",
      content: `Are you sure to delete workspace \`${workspace.name}\`?`,
      style: "warning",
      onConfirm: async () => {
        await workspaceService.deleteWorkspaceById(workspace.id);
        navigate("/");
      },
    });
  };

  const handleExitWorkspaceButtonClick = () => {
    showCommonDialog({
      title: "Exit Workspace",
      content: `Are you sure to exit workspace \`${workspace.name}\`?`,
      style: "warning",
      onConfirm: async () => {
        await deleteWorkspaceUser({
          workspaceId: workspace.id,
          userId: workspaceUser.userId,
        });
        navigate("/");
      },
    });
  };

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start">
        <p className="text-3xl mt-4 mb-4">{workspace.name}</p>
        <p className="mb-4">{workspace.description}</p>
        <div className="border-t pt-4 mt-2 flex flex-row justify-start items-center">
          <div className="flex flex-row justify-start items-center space-x-2">
            {workspaceUser.role === "ADMIN" ? (
              <>
                <button className="border rounded-md px-3 leading-8 hover:shadow" onClick={handleEditWorkspaceButtonClick}>
                  Edit
                </button>
                <button
                  className="border rounded-md px-3 leading-8 border-red-600 text-red-600 bg-red-50 hover:shadow"
                  onClick={handleDeleteWorkspaceButtonClick}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="border rounded-md px-3 leading-8 border-red-600 text-red-600 bg-red-50 hover:shadow"
                  onClick={handleExitWorkspaceButtonClick}
                >
                  Exit
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {state.showEditWorkspaceDialog && (
        <CreateWorkspaceDialog
          workspaceId={workspace.id}
          onClose={() => {
            setState({
              ...state,
              showEditWorkspaceDialog: false,
            });
          }}
          onConfirm={() => handleEditWorkspaceDialogConfirm()}
        />
      )}
    </>
  );
};

export default WorkspaceSetting;
