(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const header = $("#site-header");
  const progressBar = $("#page-progress-bar");
  const menuToggle = $("#menu-toggle");
  const mobileNav = $("#mobile-nav");

  function updateChrome() {
    const y = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle("scrolled", y > 24);
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(100, (y / scrollable) * 100) : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
  }

  updateChrome();
  window.addEventListener("scroll", updateChrome, { passive: true });
  window.addEventListener("resize", updateChrome, { passive: true });

  function closeMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "打开导航菜单");
    mobileNav.hidden = true;
    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "打开导航菜单" : "关闭导航菜单",
    );
    mobileNav.hidden = open;
    document.body.classList.toggle("menu-open", !open);
  });

  $$("#mobile-nav a").forEach((link) =>
    link.addEventListener("click", closeMenu),
  );
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const revealElements = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  $$(".villain-card").forEach((card) => {
    card.addEventListener("click", () => {
      const willOpen = !card.classList.contains("is-open");
      $$(".villain-card").forEach((item) => {
        item.classList.remove("is-open");
        item.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        card.classList.add("is-open");
        card.setAttribute("aria-expanded", "true");
      }
    });
  });

  const scenarios = [
    {
      id: "P-1401",
      type: "PRESSURE",
      risk: "87%",
      connection: "持续下降",
      location: "黑雨城 · 北区办公塔",
      title: "目标对象连续工作了 14 小时。",
      description: "它反复告诉自己：“再坚持一下，我就能证明自己。”",
      choices: [
        {
          text: "要求他立刻停止工作，切断所有任务。",
          scores: { self: 1, human: 0, world: 0 },
          title: "停止不等于理解",
          result:
            "及时休息很重要，但如果没有理解他为什么害怕停下来，Pressure 仍会在下一次任务中回来。你保护了身体，还需要继续寻找压力背后的价值焦虑。",
        },
        {
          text: "帮助他重新拆解任务，提高完成效率。",
          scores: { self: 0, human: 0, world: 1 },
          title: "效率可以缓解问题，也可能延长问题",
          result:
            "优化任务能够暂时降低负荷，但它也可能强化“只有完成才有价值”的逻辑。工具应该服务生命，而不是帮助生命更高效地耗尽自己。",
        },
        {
          text: "先问清楚：如果今晚没有完成，他真正害怕失去什么？",
          scores: { self: 2, human: 1, world: 0 },
          title: "先找到压力背后的恐惧",
          result:
            "Pressure 最强大的地方，是让人把外部结果误认为自身价值。理解“我在害怕什么”，并不会立刻解决所有任务，但它让生命重新获得选择，而不是只剩下反应。",
        },
      ],
    },
    {
      id: "E-0926",
      type: "ECHO",
      risk: "81%",
      connection: "情绪放大",
      location: "黑雨城 · 公共信息网络",
      title: "一场误解正在群聊中迅速升级。",
      description:
        "目标对象已经输入了十几条愤怒回复，每一次提示音都让情绪更强。",
      choices: [
        {
          text: "立即发送最有力的反击，让对方知道边界。",
          scores: { self: 0, human: 0, world: 1 },
          title: "边界需要表达，但愤怒不必接管表达",
          result:
            "维护边界没有错，但在 Echo 放大的状态下，最有力的话往往不是最真实的话。先区分“我要保护什么”和“我只是想赢”，才能避免情绪替你做决定。",
        },
        {
          text: "暂时离开屏幕，给情绪命名后再决定是否回复。",
          scores: { self: 2, human: 0, world: 0 },
          title: "你有情绪，但你不是情绪",
          result:
            "给情绪命名，会在感受与行动之间创造一点空间。那一点空间，就是情绪自主权重新出现的地方。",
        },
        {
          text: "私下联系其中一人，先确认对方真正想表达什么。",
          scores: { self: 1, human: 2, world: 0 },
          title: "从回响中寻找真实声音",
          result:
            "公开空间奖励立场和速度，真实理解往往发生在更安静的连接里。你没有否定情绪，而是阻止 Echo 把所有人变成彼此的回声。",
        },
      ],
    },
    {
      id: "M-0317",
      type: "MIRROR",
      risk: "74%",
      connection: "关系封闭",
      location: "黑雨城 · 南岸居住区",
      title: "一位朋友发来消息：“最近有点撑不住。”",
      description: "目标对象想回复，却又担心被卷入别人的情绪和麻烦。",
      choices: [
        {
          text: "不回复。每个人都应该先为自己负责。",
          scores: { self: 1, human: 0, world: 0 },
          title: "自我保护是必要的，但沉默也会留下结果",
          result:
            "你有权保护自己的容量，但 Mirror 会把“我现在做不到”悄悄变成“任何人都不值得靠近”。边界不等于消失，诚实说明自己的状态也是一种连接。",
        },
        {
          text: "立刻承诺解决对方的所有问题。",
          scores: { self: 0, human: 1, world: 0 },
          title: "连接不等于接管",
          result:
            "愿意帮助是善意，但把自己变成唯一的救援者，会让两个人都失去边界。真正的陪伴不是承诺解决一切，而是不让对方独自面对一切。",
        },
        {
          text: "回复：“我可能不能解决，但我愿意先听你说。”",
          scores: { self: 1, human: 2, world: 0 },
          title: "有限但真实的连接",
          result:
            "这句话既没有牺牲自己，也没有关闭关系。Mirror 害怕的正是这种连接：它承认脆弱，承认边界，也承认另一个生命值得被听见。",
        },
      ],
    },
    {
      id: "A-1108",
      type: "AVARICE",
      risk: "79%",
      connection: "意义偏移",
      location: "黑雨城 · 金融商业环",
      title: "目标对象终于达到年初设定的收入目标。",
      description:
        "不到十分钟，它已经把目标提高了一倍，并感到刚才的成就毫无意义。",
      choices: [
        {
          text: "趁势继续冲刺，动力最强的时候不能停。",
          scores: { self: 0, human: 0, world: 1 },
          title: "前进并没有错，但方向需要被重新确认",
          result:
            "欲望能够推动创造，但 Avarice 会让终点永远后退。继续前进之前，先确认新目标来自真实需要，还是来自无法忍受“已经足够”的不安。",
        },
        {
          text: "彻底放弃新的目标，欲望只会让人痛苦。",
          scores: { self: 1, human: 0, world: 0 },
          title: "压抑欲望不等于获得自由",
          result:
            "球猫侠并不反对追求。没有渴望，就不会有探索和创造。自由不是没有欲望，而是你能够判断哪些欲望值得跟随。",
        },
        {
          text: "记录此刻已经得到的东西，再写下新目标真正服务于什么。",
          scores: { self: 1, human: 0, world: 2 },
          title: "让目标重新服务生命",
          result:
            "满足感不会自动出现，它需要被允许停留。你没有放弃成长，而是在目标与生命之间重新建立关系：我追求它，是因为它服务某种值得的生活。",
        },
      ],
    },
    {
      id: "N-0004",
      type: "NULL",
      risk: "92%",
      connection: "生命感微弱",
      location: "黑雨城 · 无信号区",
      title: "目标对象说：“我没有特别难过，也没有特别想要什么。”",
      description: "所有指标都在正常范围，但生命信号正在变得越来越安静。",
      choices: [
        {
          text: "告诉它应该积极一点，重新设定几个目标。",
          scores: { self: 0, human: 0, world: 1 },
          title: "目标不能代替感受",
          result:
            "新的任务可能让系统重新运转，却不一定让生命重新出现。Null 最擅长隐藏在“看起来一切正常”里。此时首先需要的不是更多要求，而是安全地恢复感受。",
        },
        {
          text: "不催促改变，先陪它辨认最近一次真正有感觉的时刻。",
          scores: { self: 2, human: 1, world: 1 },
          title: "从一丝感觉开始恢复连接",
          result:
            "生命感不一定以宏大理想回来。一次喜欢的气味、一段音乐、一个愿意见的人，都可能是重新连接世界的微弱入口。球猫侠不替生命制造意义，只保护它重新寻找意义的能力。",
        },
        {
          text: "让它暂时退出所有关系和任务，避免再次受到刺激。",
          scores: { self: 1, human: 0, world: 0 },
          title: "休息需要出口，而不是永久隔离",
          result:
            "降低负荷可能必要，但 Null 会把安静变成彻底断联。恢复需要安全的边界，也需要至少一条仍然通向世界的线。",
        },
      ],
    },
  ];

  const storageKey = "captainMeowballPatrolV1";
  const today = new Date();
  const dateKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  function dateHash(value) {
    return value
      .split("")
      .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0);
  }

  const scenario = scenarios[Math.abs(dateHash(dateKey)) % scenarios.length];

  function defaultState() {
    return {
      version: 1,
      streak: 0,
      lastCompletedDate: null,
      scores: { self: 0, human: 0, world: 0 },
      history: {},
    };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey));
      if (!parsed || parsed.version !== 1) return defaultState();
      return {
        ...defaultState(),
        ...parsed,
        scores: { ...defaultState().scores, ...parsed.scores },
        history: parsed.history || {},
      };
    } catch {
      return defaultState();
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* localStorage unavailable */
    }
  }

  function yesterdayKey() {
    const d = new Date(today);
    d.setDate(d.getDate() - 1);
    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0"),
    ].join("-");
  }

  const state = loadState();
  const elements = {
    date: $("#patrol-date"),
    id: $("#signal-id"),
    type: $("#signal-type"),
    risk: $("#signal-risk"),
    connection: $("#signal-connection"),
    location: $("#case-location"),
    title: $("#case-title"),
    description: $("#case-description"),
    choices: $("#patrol-choices"),
    result: $("#patrol-result"),
    resultTitle: $("#result-title"),
    resultCopy: $("#result-copy"),
    review: $("#review-choice"),
    rank: $("#guardian-rank"),
    streak: $("#patrol-streak"),
    total: $("#patrol-total"),
    self: $("#score-self"),
    human: $("#score-human"),
    world: $("#score-world"),
    barSelf: $("#bar-self"),
    barHuman: $("#bar-human"),
    barWorld: $("#bar-world"),
  };

  function rankFor(total) {
    if (total >= 30) return "生命守护者";
    if (total >= 16) return "守护者";
    if (total >= 8) return "连接者";
    if (total >= 3) return "倾听者";
    return "观察者";
  }

  function renderProfile() {
    const totalScore =
      state.scores.self + state.scores.human + state.scores.world;
    const totalCases = Object.keys(state.history).length;
    elements.rank.textContent = rankFor(totalScore);
    elements.streak.textContent = String(state.streak || 0);
    elements.total.textContent = String(totalCases);
    elements.self.textContent = String(state.scores.self);
    elements.human.textContent = String(state.scores.human);
    elements.world.textContent = String(state.scores.world);
    const scale = Math.max(
      10,
      state.scores.self,
      state.scores.human,
      state.scores.world,
    );
    elements.barSelf.style.width = `${Math.min(100, (state.scores.self / scale) * 100)}%`;
    elements.barHuman.style.width = `${Math.min(100, (state.scores.human / scale) * 100)}%`;
    elements.barWorld.style.width = `${Math.min(100, (state.scores.world / scale) * 100)}%`;
  }

  function showResult(choiceIndex) {
    const choice = scenario.choices[choiceIndex];
    if (!choice) return;
    elements.resultTitle.textContent = choice.title;
    elements.resultCopy.textContent = choice.result;
    elements.result.hidden = false;
    elements.choices.parentElement.hidden = true;
  }

  function completePatrol(choiceIndex) {
    if (state.history[dateKey]) {
      showResult(state.history[dateKey].choiceIndex);
      return;
    }
    const choice = scenario.choices[choiceIndex];
    if (!choice) return;
    state.scores.self += choice.scores.self;
    state.scores.human += choice.scores.human;
    state.scores.world += choice.scores.world;
    state.streak =
      state.lastCompletedDate === yesterdayKey() ? state.streak + 1 : 1;
    state.lastCompletedDate = dateKey;
    state.history[dateKey] = {
      scenarioId: scenario.id,
      choiceIndex,
      completedAt: new Date().toISOString(),
    };
    saveState(state);
    $$(".choice-button", elements.choices).forEach((button, index) => {
      button.disabled = true;
      button.classList.toggle("is-selected", index === choiceIndex);
    });
    renderProfile();
    showResult(choiceIndex);
  }

  function renderPatrol() {
    if (!elements.choices) return;
    const formatter = new Intl.DateTimeFormat("zh-CN", {
      month: "long",
      day: "numeric",
      weekday: "short",
    });
    elements.date.textContent = formatter.format(today).toUpperCase();
    elements.id.textContent = `SIGNAL #${scenario.id}`;
    elements.type.textContent = scenario.type;
    elements.risk.textContent = scenario.risk;
    elements.connection.textContent = scenario.connection;
    elements.location.textContent = scenario.location;
    elements.title.textContent = scenario.title;
    elements.description.textContent = scenario.description;

    const completed = state.history[dateKey];
    elements.choices.innerHTML = "";
    scenario.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      if (completed) {
        button.disabled = true;
        button.classList.toggle("is-selected", completed.choiceIndex === index);
      }
      button.innerHTML = `<span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${choice.text}</span><i aria-hidden="true">→</i>`;
      button.addEventListener("click", () => completePatrol(index));
      elements.choices.appendChild(button);
    });

    renderProfile();
    if (completed) showResult(completed.choiceIndex);
  }

  elements.review?.addEventListener("click", () => {
    elements.result.hidden = true;
    elements.choices.parentElement.hidden = false;
  });

  renderPatrol();
  const year = $("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
