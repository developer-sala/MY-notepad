let memos = JSON.parse(localStorage.getItem('memos'));
memos = memos ?? [];
render();

function saveMemo() {
  const title = document.getElementById('memo-title').value;
  const content = document.getElementById('memo-content').value;

  // title과 content가 모두 입력되었을 경우에만 메모 추가하기 가능
  if (!title && !content) {
    alert('제목과 내용 모두 입력해야 메모가 추가됩니다!');
  } else if (!title) {
    alert('제목을 입력해야 메모가 추가됩니다!');
  } else if (!content) {
    alert('내용을 입력해야 메모가 추가됩니다!');
  } else {
    // 현재 시간 정보 추가하기
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const modifiedMonth = month < 10 ? '0' + month : month;
    const modifiedDate = date < 10 ? '0' + date : date;
    const modifiedHours = date < 10 ? '0' + hours : hours;
    const modifiedMinutes = minutes < 10 ? '0' + minutes : minutes;

    memos.push({
      title,
      content,
      len: memos.length,
      date: `${year}-${modifiedMonth}-${modifiedDate} ${modifiedHours}:${modifiedMinutes}`,
    });

    localStorage.setItem('memos', JSON.stringify(memos));
    render();
  }
}

function render() {
  const addNew = document.getElementById('add-new');
  addNew.innerHTML = '';

  for (const item of memos) {
    const saveTitle = document.createElement('h3');
    const saveContent = document.createElement('p');
    const saveId = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const article = document.createElement('article');

    saveTitle.textContent = `♥ ${item.title}`;
    saveContent.textContent = item.content;
    saveId.textContent = `${item.len + 1}번 _ ${item.date}`;

    saveId.className = 'today';
    deleteBtn.textContent = '삭제';
    deleteBtn.setAttribute('id', item.len);
    deleteBtn.addEventListener('click', remove);

    addNew.appendChild(article);
    article.appendChild(saveId);
    article.appendChild(saveTitle);
    article.appendChild(saveContent);
    article.appendChild(deleteBtn);
  }

  const content = document.getElementById('memo-content');
  const count = document.getElementById('count');

  content.addEventListener('input', function () {
    count.textContent = `총 ${content.value.length} 글자 / 350 글자`;
  });
}

function remove() {
  const idx = memos.find((item) => item.len == event.target.id);
  if (idx) {
    memos.splice(
      memos.findIndex((item) => item.len == idx.len),
      1
    );
  }
  localStorage.setItem('memos', JSON.stringify(memos));
  render();
}
