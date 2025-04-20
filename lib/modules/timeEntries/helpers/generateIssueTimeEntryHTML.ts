interface generateIssueTimeEntryHTMLParams {
  offset: number;
  index: number;
  url: string;
  id: number;
  subject: string;
  comments: string;
  hours: number;
  spent_on: string;
}

export function generateIssueTimeEntryHTML({ comments, hours, id, index, offset, spent_on, subject, url }: generateIssueTimeEntryHTMLParams) {
  return `
  <div class="px-5">
    <details>
      <summary class="flex cursor-pointer select-none p-2" style="gap: 10px; border: solid #ffffff55 1px; border-radius: 5px; align-items: center;">
        <span class="text-slate-200 text-xs">${offset + index}</span>
        <strong class="text-amber-400">${hours}h</strong>
        <span class="flex text-amber-200 text-xs" style="display: inline-block; white-space: nowrap;">${spent_on}</span> 
        <a class="text-cyan-500" href="${url}/issues/${id}">[${id}]</a>
        <span class="text-slate-200 text-xs">${subject}</span>
      </summary>
      <div class="flex mt-4 p-4 bg-gray-800" style="border-left: solid 2px yellow;">
        <p>${comments}</p> 
      </div>
    </details>
  </div>`;
}
