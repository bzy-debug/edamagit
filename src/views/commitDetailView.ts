import { DocumentView } from './general/documentView';
import { Uri } from 'vscode';
import * as Constants from '../common/constants';
import { TextView } from './general/textView';
import { MagitCommit } from '../models/magitCommit';
import { MagitState } from '../models/magitState';

export class CommitDetailView extends DocumentView {

  static UriPath: string = 'commit.magit';
  isHighlightable = false;
  needsUpdate = false;

  constructor(uri: Uri, private commit: MagitCommit) {
    super(uri);

    const commitTextView = new TextView(commit.diff);
    commitTextView.isHighlightable = false;
    this.addSubview(commitTextView);
  }

  public update(state: MagitState): void { }

  static encodeLocation(commitHash: string): Uri {
    return Uri.parse(`${Constants.MagitUriScheme}:${CommitDetailView.UriPath}?${commitHash}`);
  }
}