import React from "react";

import CommentRow from "./commentrow/commentrow";

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

const CommentTable = (props) => {
  const { comments, setComments } = props;

  return (
    <>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Row</th>
            <th scope="col">Comment</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {comments.sort(dynamicSort("row")).map((comment) => (
            <CommentRow comment={comment} setComments={setComments} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CommentTable;
