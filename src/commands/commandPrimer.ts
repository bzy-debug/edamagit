import MagitUtils from "../utils/magitUtils";
import { MagitRepository } from "../models/magitRepository";
import MagitStatusView from "../views/magitStatusView";
import { TextEditor, window } from "vscode";

export class CommandPrimer {

  // static primeRepo(command: (repository: MagitRepository) => Promise<void>) {
  //   return (editor: TextEditor) => {
  //     let repository = MagitUtils.getCurrentMagitRepo(editor.document);

  //     if (repository) {
  //       command(repository);
  //     }
  //   };
  // }

  static primeRepoAndView(command: (repository: MagitRepository, view: MagitStatusView) => Promise<void>): (editor: TextEditor) => Promise<void> {

    return async (editor: TextEditor) => {
      let [repository, currentView] = MagitUtils.getCurrentMagitRepoAndView(editor);

      if (repository && currentView) {

        try {
          await command(repository, currentView);
          MagitUtils.magitStatusAndUpdate(repository, currentView);
        } catch (error) {

          // TODO: statusView error message:
          // e.g top:  GitError! Your local changes to the following files would be overwritten by checkout

          // This error type, too heavy for most errors?
          //   statusBar message might be better
          //   but then custom, shorter messages are needed

          window.showErrorMessage(error.stderr ?? error.message);
        }
      }
    };
  }
}