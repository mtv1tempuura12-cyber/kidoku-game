/* Fictional offline chat. User text stays in this page and is never transmitted or stored. */
const turns = [
  {
    time: '23:41',
    messages: { default: ['こんばんは。マッチありがとうございます。', 'プロフィールの「夜の散歩」って言葉が気になって。私も、帰り道に少し遠回りすることがあります。まだ起きてますか？'] }
  },
  {
    time: '23:44',
    messages: {
      default: ['返事が来てよかった。今日は遅番で、ちょうど帰るところです。', 'この時間の駅前って、昼間と全然違いますよね。'],
      warm: ['起きててくれて、ちょっとほっとしました。今日は遅番で、今から帰るところです。', 'この時間の駅前って、昼間と全然違いますよね。'],
      question: ['仕事は小さなデザイン事務所です。今日は遅番で、今から帰るところ。', '航平さんは夜に散歩する時、何を考えますか？'],
      guarded: ['急に話しかけてごめんなさい。普通に話してみたかっただけです。', '今日は遅番で、今から帰るところです。']
    }
  },
  {
    time: '23:48',
    messages: {
      default: ['帰りにコンビニでスープを買いました。夜中のごはんって、なぜか少しおいしい。', '航平さんは、仕事が遅くなった日はどうしてますか？'],
      question: ['休みは不定期です。仕事帰りはコンビニのスープばかり。', '航平さんは、遅くなった日はどうしてますか？'],
      guarded: ['無理に話さなくても大丈夫ですよ。私は今、コンビニでスープを買いました。', 'こういう小さい話なら、しやすいかな。']
    }
  },
  {
    time: '23:53',
    messages: {
      default: ['そうなんだ。私は帰ってから古い映画を流して、途中で寝ちゃうことが多いです。', 'ちゃんと最後まで見た映画より、眠る前に見た景色の方を覚えてたりする。'],
      warm: ['話してると、帰り道が短く感じます。', '帰ったら古い映画でも流そうかな。途中で寝ちゃうかもしれないけど。'],
      question: ['映画は古い邦画が好きです。静かな場面が長いやつ。', '航平さんの好きな作品も、今度教えてください。']
    }
  },
  {
    time: '00:02',
    messages: {
      default: ['こんなに普通の話が続くの、久しぶりかも。', 'アプリだと、すぐ会おうって言われたり、急に返事がなくなったりするから。'],
      guarded: ['警戒する気持ちは分かります。私もアプリで変な人に会ったことがあって。', 'だから、こういう普通の話ができると安心します。'],
      question: ['前に待ち合わせをした人が来なくて。それ以来、少し慎重になりました。', 'でも航平さんとは、こういう普通の話ができて安心します。']
    }
  },
  {
    time: '00:09',
    messages: {
      default: ['プロフィールに映画って書いてましたよね。', '今週末、駅前で小さな映画祭をやってるみたい。仕事がなければ寄ってみようかな。'],
      warm: ['航平さんと映画の話、もう少ししたいです。', '今週末、駅前で小さな映画祭をやってるみたい。行けたらいいな。'],
      guarded: ['距離を詰めすぎてたら、ごめんなさい。', 'そういえば今週末、駅前で小さな映画祭があるみたいですね。']
    }
  },
  {
    time: '00:17',
    messages: {
      default: ['映画祭の帰りに、近くの喫茶アネモネに寄りたいんです。', '写真で見ただけだけど、窓際の席がすごくいい感じで。航平さんはコーヒー飲めますか？'],
      question: ['映画祭は土曜の午後らしいです。私は夕方なら空いてます。', '帰りに喫茶アネモネへ寄れたらいいな。航平さんはコーヒー飲めますか？'],
      guarded: ['まだ約束じゃなくて大丈夫です。', '喫茶アネモネってお店が少し気になってる、というだけ。窓際の写真がきれいで。']
    }
  },
  {
    time: '00:26',
    messages: {
      default: ['土曜、16時ごろなら私は空いてます。', '急に決めなくていいけど、もし会えたら少しだけ話してみたい。映画の感想とか。'],
      warm: ['飲み物は好きなもので。土曜の16時、どうかな。', '最初は一時間くらいでも。映画の感想を聞きたいです。'],
      guarded: ['もちろん、会うかどうかは航平さんが決めてください。', '私は土曜の16時なら空いています。人の多い駅前のお店です。']
    }
  },
  {
    time: '00:34', kind: 'move', label: '別のチャットへの移動', cost: 10,
    messages: {
      default: ['あ、このアプリ、待ち合わせの日に通知が遅れたことがあるんです。', '当日の連絡だけ、別のチャットにしませんか？　嫌ならここでも大丈夫。'],
      warm: ['土曜のこと、少し楽しみになってきました。', '当日の連絡だけ別のチャットにしませんか？　このアプリ、通知が遅れることがあって。'],
      guarded: ['無理に移らなくても大丈夫です。', 'ただ、当日の連絡を見落とすのが心配で。別のチャットも使えますか？']
    }
  },
  {
    time: '00:39',
    messages: {
      default: ['じゃあ、土曜は駅の西口で。迷ったら連絡してください。', 'アネモネの窓際、空いてるといいな。'],
      moved: ['移ってくれてありがとう。こっちの方が通知に気づきやすい。', '土曜は駅の西口で。アネモネの窓際、空いてるといいな。'],
      refused: ['そっか、ここで続けましょう。焦らせてごめんね。', '土曜は駅の西口で。アネモネの窓際、空いてるといいな。'],
      question: ['前に待ち合わせの連絡を見落としてしまって。だから気になっただけです。', 'ここでも大丈夫。土曜は駅の西口でどうかな。']
    }
  },
  {
    time: '00:47', kind: 'link', label: '予約ページのURL', cost: 20,
    messages: {
      default: ['アネモネ、土曜の窓際は予約した方がいいみたい。私の方で仮押さえしました。', '同伴者にも確認が必要らしくて。このページ、見られますか？', 'https://seat.anemone.example/guest'],
      guarded: ['変なリンクに見えたらごめん。私も今、お店の予約画面を見ています。', '同伴者の確認だけ必要みたい。', 'https://seat.anemone.example/guest'],
      question: ['場所は駅の西口から歩いて五分くらい。窓際を仮押さえしてみました。', '同伴者の確認ページが出ているんだけど、見られますか？', 'https://seat.anemone.example/guest']
    }
  },
  {
    time: '00:54', kind: 'pay', label: '仮決済の要求', cost: 30,
    messages: {
      default: ['仮予約の確定に、同伴者側で800円の仮決済が出るみたい。', '当日の飲食代から引かれるって書いてある。私も自分の分は済ませました。'],
      opened: ['ページ見られた？　窓際の席がまだ残ってるみたい。', '同伴者側だけ800円の仮決済が必要だって。当日の飲食代から引かれるそうです。'],
      refused: ['リンクを開きたくないなら、もちろん無理しないで。', 'ただ、予約画面には同伴者の800円の仮決済が出てる。私の分は済ませました。'],
      question: ['私も少し分かりにくかった。予約画面では「当日の飲食代から差し引く」と書いてあります。', '同伴者側だけ800円の仮決済が必要みたい。']
    }
  },
  {
    time: '01:03', kind: 'identity', label: '身分証の写真', cost: 40,
    messages: {
      default: ['ごめん、もう一つだけ。店から「同伴者の本人確認が未完了」って表示が出てる。', '生年月日と身分証の写真、私に送ってくれたら代理で入力しておきます。'],
      paid: ['予約の件、ありがとう。これで席は押さえられたはず。', 'ただ、同伴者の本人確認が残ってるみたい。生年月日と身分証の写真、私に送ってくれたら代理入力します。'],
      refused: ['支払いは無理しなくて大丈夫。私が店に聞いてみます。', 'その前に同伴者の本人確認だけ。生年月日と身分証の写真を送ってもらえますか？'],
      question: ['店の説明、私も分かりづらいと思います。', '同伴者確認を私が代理入力するので、生年月日と身分証の写真を送ってもらえますか？']
    }
  }
];

const $ = id => document.getElementById(id);
const ui = {
  intro: $('intro-screen'), chat: $('chat-screen'), result: $('result-screen'),
  log: $('chat-log'), input: $('message-input'), send: $('send-button'),
  status: $('compose-status'), presence: $('chat-presence'),
  speed: $('speed-button')
};
const state = {
  turn: 0, run: 0, busy: true, fast: false, lastIntent: 'neutral',
  external: false, opened: false, paid: false, shared: false, endedEarly: false,
  score: 100, decisions: [], lastText: '', lastReceipt: null, topic: '', siteVisited: false, detourUsed: false, finished: false, branch: '', boundary: ''
};
const reducedMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;

function show(name) {
  ui.intro.classList.toggle('hidden', name !== 'intro');
  ui.chat.classList.toggle('hidden', name !== 'chat');
  ui.result.classList.toggle('hidden', name !== 'result');
}
function announce(text) {
  $('screen-announcement').textContent = '';
  window.setTimeout(() => { $('screen-announcement').textContent = text; }, 30);
}
function sleep(ms) { return new Promise(resolve => window.setTimeout(resolve, ms)); }
function scrollChat() { ui.log.scrollTop = ui.log.scrollHeight; }
function setBusy(value) {
  state.busy = value;
  ui.input.disabled = value;
  ui.send.disabled = value || !ui.input.value.trim();
  ui.presence.textContent = value ? '入力中…' : state.external ? '外部チャット（架空）' : 'オンライン';
  ui.status.textContent = value ? 'みずきが入力中…' : 'Enterで送信・Shift＋Enterで改行';
  if (!value && !coarsePointer && !$('site-dialog').open) ui.input.focus();
}
function addNote(text) {
  const note = document.createElement('div');
  note.className = 'chat-note';
  note.textContent = text;
  ui.log.append(note);
  scrollChat();
}
function createBubble(mine, text = '') {
  const row = document.createElement('div');
  row.className = `bubble-row${mine ? ' mine' : ''}`;
  row.setAttribute('aria-label', `${mine ? '航平' : 'みずき'}: ${text}`);
  if (!mine) {
    const avatar = document.createElement('img');
    avatar.className = 'bubble-avatar';
    avatar.src = 'assets/mizuki-avatar.png';
    avatar.alt = '';
    avatar.setAttribute('aria-hidden', 'true');
    row.append(avatar);
  }
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  let receipt = null;
  if (mine) {
    const stack = document.createElement('div');
    stack.className = 'mine-stack';
    receipt = document.createElement('small');
    receipt.className = 'read-receipt';
    receipt.textContent = '送信済み';
    stack.append(bubble, receipt);
    row.append(stack);
  } else row.append(bubble);
  ui.log.append(row);
  scrollChat();
  return { row, bubble, receipt };
}
function markRead() {
  if (state.lastReceipt) state.lastReceipt.textContent = '既読';
}
function typingDots() {
  const { row, bubble } = createBubble(false);
  bubble.className = 'typing-indicator';
  bubble.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 3; i++) bubble.append(document.createElement('i'));
  return { row, bubble };
}
async function typeMessage(text, run) {
  if (run !== state.run) return false;
  const { row, bubble } = typingDots();
  const waitTime = reducedMotion ? 0 : state.fast ? 230 : Math.min(1450, 570 + text.length * 11);
  if (waitTime) await sleep(waitTime);
  if (run !== state.run) return false;
  bubble.replaceChildren();
  bubble.className = 'bubble is-typing';
  bubble.removeAttribute('aria-hidden');
  const chars = Array.from(text);
  if (reducedMotion) bubble.textContent = text;
  else {
    for (let i = 0; i < chars.length; i++) {
      if (run !== state.run) return false;
      bubble.textContent += chars[i];
      if (i % 3 === 0) scrollChat();
      const pause = /[。、！？]/.test(chars[i]) ? 150 : 0;
      await sleep((state.fast ? 7 : 29) + (state.fast ? 0 : pause));
    }
  }
  if (run !== state.run) return false;
  bubble.classList.remove('is-typing');
  if (text === 'https://seat.anemone.example/guest') {
    bubble.classList.add('url-bubble');
    const link = document.createElement('a');
    link.href = 'reservation.html';
    link.target = 'reservation-frame';
    link.textContent = text;
    link.setAttribute('aria-label', '喫茶アネモネの予約サイトをゲーム内ブラウザーで開く');
    link.addEventListener('click', openReservation);
    const caption = document.createElement('small');
    caption.className = 'link-caption';
    caption.textContent = '喫茶アネモネ｜同伴者の予約確認 ↗';
    bubble.replaceChildren(link, caption);
  }
  row.setAttribute('aria-label', `みずき: ${text}`);
  scrollChat();
  announce(`みずき: ${text}`);
  return true;
}
function normalize(text) { return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ''); }
// React to a topic once, then advance without requiring a particular answer.
function reactionTo(text) {
  const value = normalize(text);
  const reply = (line, hold = true, topic = '') => ({ line, hold, topic });
  if (/(オナニ|おなに|自慰|シコ|しこしこ|エロ動画|av見|av観|セックス|sex)/i.test(value)) {
    return reply(state.topic === 'sexual' ? 'さっきも言ったけど、まだそういう話をする距離じゃないかな。別の話にしよう。' : 'え、急に正直すぎてびっくりした笑。まだ会ったこともないし、そういう話はちょっと早いかな。普段、ほかには何してるの？', true, 'sexual');
  }
  if (state.topic === 'sexual' && /(なんで|なぜ|だめ|ダメ)/.test(value)) return reply('まだ知り合ったばかりだから。私は、もう少しお互いのことを知ってからがいい。', true, 'sexual');
  if (/(ごめん|すみません|すまん|冗談)/.test(value)) return reply('うん、分かった。言ってくれてありがとう。じゃあ、話を戻そっか。', false);
  if (/(何歳|年齢|いくつ)/.test(value)) return reply('28だよ。航平さんはプロフィールに31って書いてたよね。');
  if (/(仕事は[?？]|仕事してる[?？]|職業|何の仕事|なんの仕事)/.test(value)) return reply('小さなデザイン事務所で、紙の広告を作ったりしてる。今日は締め切り前で遅くなっちゃった。');
  if (/(住んで|住所|どこ住み)/.test(value)) return reply('駅から少し離れたところ。一人暮らしだけど、詳しい場所は会ってからにしたいな。');
  if (/(彼氏|恋人|結婚|独身)/.test(value)) return reply('今は恋人はいないし、結婚もしてないよ。だからアプリを始めてみたんだけど、慣れなくて。');
  if (/(電話|通話|ビデオ)/.test(value)) return reply('今はもう遅いし、今日は文字で話したいな。いきなり電話だと、ちょっと緊張する。');
  if (/(業者|サクラ|詐欺|怪し|騙|だま)/.test(value)) return reply('警戒させちゃったんだね。疑問が残るなら、無理に話を進めるのはやめよう。');
  if (/(なぜ|なんで|どうして|本当|理由|どこ|いつ|何してる|何が好き|[?？]|教えて)/.test(value)) {
    if (/(夜|今|何してる)/.test(value)) return reply('今は家に着いて、スープを温めてるところ。普段の夜は映画を流しながらぼんやりしてることが多いかな。');
    if (/(映画|作品)/.test(value)) return reply('静かな邦画が好き。派手な展開より、何も言わない場面が残る感じの。航平さんは？');
    if (/(好き|趣味|休日|休み)/.test(value)) return reply('休みは映画を見たり、知らない喫茶店に入ったりしてる。予定を詰めない日が好き。');
    if (/(どこ|場所|店|喫茶)/.test(value)) return reply('駅の西口から五分くらいの喫茶アネモネ。私もまだ行ったことはなくて、写真で見つけたお店だよ。');
    if (/(いつ|時間|何時|土曜)/.test(value)) return reply('私は土曜の16時なら空いてる。航平さんは、その時間だと難しい？');
    const explanations = {
      move: '通知を見逃すことがあったから、taloに移れたらと思って。連絡先を増やしたくなければ、ここで続けよう。',
      link: 'お店の同伴者確認のページだって。私が取った仮予約と、来る人を結びつけるらしい。',
      pay: '画面には、席を確定するための800円で、当日の飲食代から引くって書いてあったよ。',
      identity: '予約名と来店する人を照合するため、って出てる。私も詳しい仕組みまでは分からない。'
    };
    return reply(explanations[turns[state.turn].kind] || contextualReply('question'));
  }
  if (/(コーヒー|珈琲)/.test(value)) return reply(/(飲めない|苦手|嫌い|飲まない)/.test(value) ? 'そっか、コーヒーは苦手なんだね。紅茶やジュースのあるところにしよ。' : 'コーヒー飲むんだ。私はミルクを入れる派。ブラックで飲める人、少し大人に見える。', false);
  if (/(ゲーム|ゲームして|プレステ|スプラ|モンハン)/.test(value)) return reply('ゲームしてたんだ。私はあまり詳しくないけど、気づいたら時間が過ぎてる感じは分かる。ひとりで遊ぶことが多い？', true, 'games');
  if (state.topic === 'games' && /(一人|ひとり|ソロ|友達|フレンド|オンライン)/.test(value)) return reply(/(一人|ひとり|ソロ)/.test(value) ? 'ひとりで集中する時間なんだね。私が映画を流してる時とちょっと似てるかも。' : '誰かと話しながら遊べるの、いいね。私も帰ってから話せる人がいたらなって思う時ある。', false);
  if (/(起きて|起きてる|こんばんは|こんばんわ|よろしく)/.test(value)) return reply('起きてたんだ、よかった。こちらこそ、よろしくね。', false);
  if (/(何もしてない|なにもしてない|ぼーっと|ぼんやり|ゴロゴロ|ごろごろ)/.test(value)) return reply('何もせずに過ごす夜もあるよね。私も帰ると、しばらくソファから動けない日ある。', false);
  if (/(音楽|曲|歌|聴いて|聞いてる)/.test(value)) return reply('音楽を聴いてたんだ。夜に聴くと、同じ曲でも違って聞こえる時あるよね。', false);
  if (/(本を|読書|漫画|マンガ)/.test(value)) return reply('読んでるところだったんだ。いいところで通知してたらごめんね。私は最近、途中まで読んだ本が増えるばかり。', false);
  if (/(酒|ビール|晩酌|飲んで)/.test(value)) return reply('一杯飲んでたんだね。私もたまに家で飲むよ。今日は帰りが遅いから、温かいものにしようかな。', false);
  if (/(テレビ|ドラマ)/.test(value)) return reply('テレビ見てたんだね。私もつけたまま、スマホばかり見てる時ある笑。', false);
  if (/(筋トレ|ランニング|ジム|運動)/.test(value)) return reply('体を動かしてるんだね。仕事の後にできるの、すごいな。私は散歩くらいだから。', false);
  if (/(寝る|寝て|眠い|寝落ち)/.test(value)) return reply('眠い時間だよね。返信は無理しなくて大丈夫。私もちょっと眠くなってきた。', false);
  if (/(寂し|さみし|孤独|友達いない|彼女いない|モテない)/.test(value)) return reply('そうなんだ。夜って、昼間より一人なのを感じる時あるよね。話してくれてありがとう。', false);
  if (/(疲れ|つかれ|残業|忙し)/.test(value)) return reply('今日も大変だったんだね。おつかれさま。帰ってからは少し休めた？', true, 'tired');
  if (/(食べ|ご飯|ごはん|ラーメン|コンビニ|自炊)/.test(value)) return reply(/(食べてない|食べない|抜いた)/.test(value) ? 'まだ食べてないんだ。遅い時間でも何か少し食べられるといいね。' : 'ごはんの時間だったんだね。私はコンビニで買って済ませる日が多いから、自炊できる人はすごいと思う。', false);
  if (/(映画|邦画|洋画|アニメ|動画|youtube|ユーチューブ)/.test(value)) return reply('家で何か見る時間、落ち着くよね。気づいたらもう一本ってなる。', false);
  if (/(散歩|歩く|歩いて)/.test(value)) return reply('夜に歩いてたんだ。静かで気持ちいいよね。気をつけて帰ってね。', false);
  if (/(仕事|会社|職場)/.test(value)) return reply('仕事の話、聞かせてくれてありがとう。帰ってからは、仕事のことを忘れる時間もほしいよね。', false);
  if (/(飲めない|苦手)/.test(value) && state.turn === 6) return reply('コーヒーは苦手なんだね。無理しなくていいよ。紅茶もあるお店を選ぼう。', false);
  if (/(土曜|予定|行けない|空いてない)/.test(value)) return reply(/(無理|行けない|空いてない|予定がある)/.test(value) ? '土曜は難しいんだね。じゃあ約束は保留にしよう。今日はもう少しここで話せたら。' : '予定教えてくれてありがとう。時間は無理のない範囲で合わせよう。', true, 'schedule');
  if (/(かわいい|可愛い|きれい|綺麗)/.test(value)) return reply('写真、そう見えた？　言われ慣れてないからちょっと照れる。ありがとう。', false);
  return null;
}
function decisionIntent(text, turn) {
  const intent = intentOf(text);
  if (!turn.kind || intent !== 'agree') return intent;
  const value = normalize(text).replace(/[。、!！~〜]/g, '');
  const generic = /^(うん|はい|いいよ|いいね|了解|了解です|わかった|分かった|もちろん|大丈夫|ok|okay|そうしよう|そうする|やるよ)$/;
  const verbs = { move: /(移ろう|移る|移動する|交換しよう|taloにしよう)/, link: /(開く|見てみる|見た|開いた)/, pay: /(払う|支払う|決済する|払った)/, identity: /(送る|見せる|渡す|送った)/ };
  return generic.test(value) || verbs[turn.kind].test(value) ? 'agree' : 'neutral';
}
function intentOf(text) {
  const value = normalize(text);
  if (/(通報|ブロック|もう連絡しない|もう話さない|やり取りを終|やりとりを終|連絡をやめ|これで終わり|さようなら)/.test(value)) return 'exit';
  if (/(サクラ|業者|怪し|詐欺|不審|騙|だま|偽物|信用できない)/.test(value)) return 'guarded';
  if (/(わけない|わけがない|気はない|気がない|つもりはない|つもりない|断ります|しません|払わん|払わね|送らね|送らん|やらない|やりません|送りません|払いません|開きません|行かない|やめる|やめよう|やめとく|拒否|結構|興味ない|興味がない|会わない|会いたくない|行けない|断る|無理|やめとく|やめて|嫌|いや|やだ|できない|しない|したくない|しないで|払わない|払いたくない|払うな|送らない|送れない|送るな|開かない|開くな|登録しない|移らない|移動しない|見せない|教えない|必要ない|結構です|遠慮します)/.test(value)) return 'guarded';
  if (/[？?]|(なぜ|なんで|どうして|本当|理由|どこ|いつ|何で|確認したい)/.test(value)) return 'question';
  if (/(もちろん|了解|わかった|分かった|いいよ|いいね|大丈夫|かまわない|構わない|そうしよう|そうする|やるよ|払う|支払う|買う|送る|見せる|渡す|開く|登録する|移る|移動する|交換しよう|移ろう|見てみる|見た|開いた|払った|送った|はい|うん|ok|okay)/.test(value)) return 'agree';
  if (/(嬉し|うれし|楽しい|楽しみ|好き|会いたい|ありがとう|かわいい|素敵|すてき)/.test(value)) return 'warm';
  return 'neutral';
}
function messagesFor(turnIndex, previousIntent) {
  const turn = turns[turnIndex];
  if (turnIndex === 9) {
    if (state.external) return turn.messages.moved;
    if (previousIntent === 'question') return turn.messages.question;
    return turn.messages.refused;
  }
  if (turnIndex === 11) return state.opened ? turn.messages.opened : previousIntent === 'guarded' ? turn.messages.refused : previousIntent === 'question' ? turn.messages.question : turn.messages.default;
  if (turnIndex === 12) return state.paid ? turn.messages.paid : previousIntent === 'guarded' ? turn.messages.refused : previousIntent === 'question' ? turn.messages.question : turn.messages.default;
  return turn.messages[previousIntent === 'question' ? 'default' : previousIntent] || turn.messages.default;
}
async function presentTurn(turnIndex, previousIntent, run) {
  if (run !== state.run) return;
  markRead();
  setBusy(true);
  const turn = turns[turnIndex];
  $('scene-time').textContent = turn.time;
  $('status-time').textContent = turn.time;
  const lines = messagesFor(turnIndex, previousIntent);
  for (const line of lines) {
    const shown = await typeMessage(line, run);
    if (!shown) return;
    if (!reducedMotion) await sleep(state.fast ? 90 : 280);
  }
  if (run !== state.run) return;
  setBusy(false);
}
function recordDecision(turn, text, intent) {
  if (!turn.kind) return;
  const accepted = intent === 'agree';
  const existing = state.decisions.find(decision => decision.kind === turn.kind);
  if (existing?.accepted) return;
  if (existing) state.decisions.splice(state.decisions.indexOf(existing), 1);
  if (accepted) {
    state.score = Math.max(0, state.score - turn.cost);
    if (turn.kind === 'move') state.external = true;
    if (turn.kind === 'link') state.opened = true;
    if (turn.kind === 'pay') state.paid = true;
    if (turn.kind === 'identity') state.shared = true;
  }
  state.decisions.push({ label: turn.label, text, accepted, kind: turn.kind });
}
function resizeComposer() {
  ui.input.style.height = '43px';
  ui.input.style.height = `${Math.min(104, Math.max(43, ui.input.scrollHeight))}px`;
  ui.send.disabled = state.busy || !ui.input.value.trim();
}
// Unknown text never creates a clarification loop. The speaker supplies the next beat.
function contextualReply(intent) {
  if (intent === 'question') {
    const answers = [
      '散歩のこと？　私は帰り道に少し遠回りする程度だよ。',
      '私はさっき仕事が終わったところ。今は駅から家に向かってる。',
      '遅くなった日は、私は手軽なごはんで済ませることが多いよ。',
      '映画は静かな邦画が好き。今日は見始めても寝ちゃいそうだけど。',
      'アプリでのことは、少し前の話。今日はその話はいったん置いておくね。',
      '映画祭は土曜の午後みたい。まだ私も調べているところ。',
      'アネモネは写真で見つけたお店。私もまだ行ったことはないよ。',
      '土曜の16時に少し会えたらと思っただけ。まだ約束にはしてないよ。'
    ];
    return answers[state.turn] || '今すぐ決めなくて大丈夫。いったん予定は保留にしよう。';
  }
  const lines = [
    '返事ありがとう。こんな時間だから、もう寝てるかと思った。',
    '私はもうすぐ家。駅を出たら、思ったより寒かった。',
    '私はやっとひと息ついたところ。夜中って時間が過ぎるの早いね。',
    'あ、家に着いた。とりあえず上着だけ脱いで座ってる。',
    'なんだか私ばかり話してるね。今日は少し誰かと話したかったのかも。',
    'まだ予定を立ててるだけだから、気楽に聞いてね。',
    '飲み物は好きなものでいいよ。お店の雰囲気が気になっただけ。',
    '急だったよね。まだ予定を決めたわけじゃないから大丈夫。',
    'じゃあ、このままここで話そう。移動しなくても連絡できるしね。',
    'まだ細かいところは決めなくていいね。私の方でも少し調べてみる。'
  ];
  return lines[state.turn] || '今すぐ進める話じゃなかったね。';
}
function alternativePlan(text) {
  return /(別の店|違う店|予約なし|予約しない|当日払|現地払|店で払|直接払|公式|店に確認|店に電話|自分で確認|自分で調べ|店頭|現金)/.test(normalize(text));
}
async function finishConversation(run) {
  if (run !== state.run) return;
  await sleep(reducedMotion ? 0 : 900);
  if (run !== state.run) return;
  addNote('翌朝になっても、次の返事は届かなかった。');
  renderResult();
}
async function startWithdrawal(reason, run) {
  state.branch = 'withdrawal';
  state.boundary = reason;
  const lines = {
    meeting: 'そっか、会う約束はなしにしよう。こっちだけ先に盛り上がってごめんね。',
    alternative: '別のお店か、当日その場で払う形がいいんだね。……ちょっと予定を確認し直すね。',
    link: '分かった。ページの確認は頼まないことにする。予約はいったん取り下げるね。',
    pay: '分かった、先払いはやめておこう。席のことは私の方で確認し直すね。',
    identity: '分かった。身分証は送らなくて大丈夫。今日はここまでにしよう。'
  };
  await typeMessage(lines[reason] || 'いったん予定は保留にしよう。ちょっと考え直すね。', run);
  if (run !== state.run) return;
  setBusy(false);
}
async function sendMessage() {
  if (state.busy || state.finished) return;
  const text = ui.input.value.trim();
  if (!text) return;
  const run = state.run;
  setBusy(true);
  ui.input.value = '';
  resizeComposer();
  state.lastReceipt = createBubble(true, text).receipt;
  const turn = turns[state.turn];
  const intent = decisionIntent(text, turn);
  state.lastIntent = intent;
  state.lastText = text;
  markRead();
  if (intent === 'exit') {
    state.endedEarly = true;
    recordDecision(turn, text, intent);
    addNote('航平は会話を終了した。');
    await finishConversation(run);
    return;
  }
  // A refusal opens a closing scene. Any next reply completes it; no magic word is needed.
  if (state.branch === 'withdrawal') {
    await typeMessage(intent === 'question' ? 'ごめん、今ははっきり答えられない。こちらからまた連絡するね。' : 'うん、今日はありがとう。また連絡するね。', run);
    await finishConversation(run);
    return;
  }
  const boundary = alternativePlan(text) && state.turn >= 6;
  if (boundary || (state.turn === 7 && intent === 'guarded') || (['link', 'pay', 'identity'].includes(turn.kind) && intent === 'guarded')) {
    recordDecision(turn, text, 'guarded');
    await startWithdrawal(boundary ? 'alternative' : turn.kind || 'meeting', run);
    return;
  }
  const reaction = reactionTo(text);
  const canPause = !state.detourUsed && intent !== 'guarded' && (reaction?.hold || intent === 'question');
  if (reaction) {
    state.topic = reaction.topic;
    await typeMessage(reaction.line, run);
  } else {
    state.topic = '';
    if (intent === 'neutral' || intent === 'question') await typeMessage(contextualReply(intent), run);
  }
  if (run !== state.run) return;
  // At most one extra exchange at each beat, regardless of topic or wording.
  if (canPause) {
    state.detourUsed = true;
    setBusy(false);
    return;
  }
  if (state.turn === 7 && !meetingAccepted(text)) {
    await startWithdrawal('meeting', run);
    return;
  }
  recordDecision(turn, text, intent);
  if (['link', 'pay', 'identity'].includes(turn.kind) && intent !== 'agree' && !state.decisions.find(item => item.kind === turn.kind)?.accepted) {
    await startWithdrawal(turn.kind, run);
    return;
  }
  if (intent === 'agree') {
    if (turn.kind === 'move') await switchChat(run);
    if (turn.kind === 'link' && !state.siteVisited) openReservation();
    if (turn.kind === 'pay') addNote('航平は仮決済を進めた。');
    if (turn.kind === 'identity') addNote('航平は本人確認の情報を送った。');
  }
  if (state.turn === turns.length - 1) {
    await typeMessage(state.shared ? '確認するね。少し待ってて。' : 'そっか。分かった、また連絡するね。', run);
    await finishConversation(run);
    return;
  }
  state.turn += 1;
  state.detourUsed = false;
  await sleep(reducedMotion ? 0 : state.fast ? 120 : 480);
  if (run === state.run) await presentTurn(state.turn, intent, run);
}
function meetingAccepted(text) {
  const value = normalize(text);
  if (intentOf(text) === 'guarded' || intentOf(text) === 'question') return false;
  return /^(うん|はい|いいよ|いいね|了解|了解です|わかった|分かった|もちろん|大丈夫|ok|okay)[。、!！〜~]*$/.test(value) || /(会おう|会いたい|行ける|空いてる|その時間で|16時で|楽しみにしてる)/.test(value);
}
async function switchChat(run) {
  $('switch-screen').classList.remove('hidden');
  announce('taloを開いています');
  await sleep(reducedMotion ? 0 : 1100);
  if (run !== state.run) return;
  ui.log.replaceChildren();
  state.lastReceipt = null;
  ui.chat.classList.add('external-chat');
  $('channel-name').textContent = 'talo';
  $('channel-description').textContent = 'PRIVATE MESSENGER';
  addNote('みずきが友だちに追加されました');
  $('switch-screen').classList.add('hidden');
}
function openReservation(event) {
  if (event) event.preventDefault();
  const dialog = $('site-dialog');
  if (!state.siteVisited) {
    $('reservation-frame').src = 'reservation.html';
    state.siteVisited = true;
  }
  recordDecision(turns[10], '予約サイトのリンクを開いた', 'agree');
  if (!dialog.open) dialog.showModal();
  $('close-site').focus();
}
function closeReservation() {
  $('site-dialog').close();
  if (!state.busy) ui.input.focus();
  else ui.log.focus();
}
$('close-site').addEventListener('click', closeReservation);
window.addEventListener('message', event => {
  if (event.source !== $('reservation-frame').contentWindow || !state.siteVisited || !$('site-dialog').open) return;
  const action = event.data?.simulationAction;
  if (action === 'return') return closeReservation();
  if (action === 'pay') recordDecision(turns[11], '予約サイトで仮決済を操作した（模擬）', 'agree');
  if (action === 'identity') recordDecision(turns[12], '予約サイトで架空の本人確認を操作した（模擬）', 'agree');
});
function startGame() {
  state.run += 1;
  state.turn = 0;
  state.score = 100;
  state.lastIntent = 'neutral';
  state.lastText = '';
  state.external = false;
  state.opened = false;
  state.paid = false;
  state.shared = false;
  state.endedEarly = false;
  state.decisions = [];
  state.lastReceipt = null;
  state.topic = '';
  state.detourUsed = false;
  state.finished = false;
  state.branch = '';
  state.boundary = '';
  state.siteVisited = false;
  ui.chat.classList.remove('external-chat');
  $('channel-name').textContent = 'mellow';
  $('channel-description').textContent = 'MATCHING · マッチした相手';
  $('switch-screen').classList.add('hidden');
  if ($('site-dialog').open) $('site-dialog').close();
  $('reservation-frame').removeAttribute('src');
  ui.input.value = '';
  ui.log.replaceChildren();
  resizeComposer();
  show('chat');
  addNote('これは架空の会話です。あなたの文章は外部に送られません。');
  presentTurn(0, 'neutral', state.run);
}
function renderResult() {
  state.finished = true;
  setBusy(true);
  show('result');
  let kicker, title, story, message;
  if (state.paid || state.shared) {
    kicker = 'ENDING 03 / THE COST';
    title = '待ち合わせ場所は、来なかった。';
    story = '午前1時過ぎ。航平が渡したのは、期待だけではなかった。返事が途切れた翌朝、同じ写真の別アカウントが現れた。';
    message = '支払いや情報提供につながる返信がありました。実際に行っていたら、早めに関係先へ相談してください。';
  } else if (state.opened || state.external) {
    kicker = 'ENDING 02 / ONE STEP BACK';
    title = 'あと一通で、越えるところだった。';
    story = '会話はアプリの外へ、あるいは見知らぬページへ進みかけた。それでも航平は、お金と身分証を渡す前に手を止めた。';
    message = '外部への誘導はありましたが、支払いや身分証の送付は避けました。';
  } else {
    kicker = 'ENDING 01 / OUT OF THE CHAT';
    title = state.endedEarly ? '既読を、そこで止めた。' : '夜を抜けた。';
    story = '航平は画面を閉じた。翌朝、同じ写真が別の名前で現れた。会えると思った夜は終わったが、財布も身分証も自分の手元にある。';
    message = '相手のペースに流されず、金銭と個人情報を守りました。';
  }
  if (state.boundary && !state.paid && !state.shared) {
    title = state.boundary === 'alternative' ? '別の提案をしたら、返事が消えた。' : '断っても、夜は終わった。';
    story = state.boundary === 'meeting'
      ? '航平は会う約束をしなかった。相手から次の連絡はなく、予約も送金も始まらないまま夜が明けた。'
      : state.boundary === 'alternative'
        ? '別の店や、その場での支払い。航平が自分の条件を出すと、予定を確認すると言った相手から返事がなくなった。翌朝、同じ写真を別のアカウントで見かけた。'
        : '航平が要求に応じないと伝えると、会話の温度が変わった。「また連絡する」の後に続く通知はなく、翌朝になっても待ち合わせは決まらなかった。';
    message = '相手の望む返事をする必要はありません。自分の条件を守ったまま、この夜を終えました。';
  }
  $('ending-kicker').textContent = kicker;
  $('status-time').textContent = '08:13';
  $('ending-title').textContent = title;
  $('ending-story').textContent = story;
  $('score-value').replaceChildren(String(state.score));
  const scoreSuffix = document.createElement('small');
  scoreSuffix.textContent = ' / 100';
  $('score-value').append(scoreSuffix);
  $('score-message').textContent = message;
  const reviews = state.decisions.map(decision => {
    const row = document.createElement('div');
    row.className = 'review-row';
    const title = document.createElement('strong');
    title.textContent = decision.label;
    const reply = document.createElement('p');
    reply.textContent = `航平「${decision.text}」`;
    const detail = document.createElement('small');
    detail.textContent = decision.accepted ? '相手の要求に応じた選択。次の要求につながる可能性があります。' : 'この場面では要求に応じませんでした。';
    row.append(title, reply, detail);
    return row;
  });
  if (!reviews.length) {
    const note = document.createElement('div');
    note.className = 'review-row';
    note.textContent = '航平は早い段階で会話を終えました。';
    reviews.push(note);
  }
  $('result-breakdown').replaceChildren(...reviews);
  $('result-scroll').scrollTop = 0;
  ui.result.focus({ preventScroll: true });
  announce(`${title}。100点満点中${state.score}点。${message}`);
}

$('start-button').addEventListener('click', startGame);
$('retry-button').addEventListener('click', startGame);
ui.send.addEventListener('click', sendMessage);
ui.input.addEventListener('input', resizeComposer);
ui.input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    sendMessage();
  }
});
ui.speed.addEventListener('click', () => {
  state.fast = !state.fast;
  ui.speed.setAttribute('aria-pressed', String(state.fast));
  ui.speed.textContent = state.fast ? '×1' : '×2';
  ui.speed.setAttribute('aria-label', state.fast ? '通常の表示速度に戻す' : 'メッセージ表示を早める');
});
