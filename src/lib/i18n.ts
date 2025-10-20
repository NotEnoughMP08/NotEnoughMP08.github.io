import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';

export type Locale = 'ko' | 'en' | 'ja' | 'zh';

type TranslationValue = string | string[];

type TranslationRecord = {
	[key: string]: TranslationValue | TranslationRecord;
};

type TranslationNode = TranslationValue | TranslationRecord;

const STORAGE_KEY = 'nemp-lang';

const isLocale = (value: string | null): value is Locale =>
	value === 'ko' || value === 'en' || value === 'ja' || value === 'zh';

const dictionary: Record<Locale, TranslationRecord> = {
	ko: {
		language: {
			srLabel: '언어 선택',
			ko: '한국어',
			en: '영어',
			ja: '일본어',
			zh: '중국어'
		},
		nav: {
			home: 'Home',
			about: 'About',
			works: 'Works',
			contact: 'Contact',
			ariaLabel: 'Main navigation'
		},
		theme: {
			switchToLight: '라이트 모드로 전환',
			switchToDark: '다크 모드로 전환'
		},
		footer: {
			copyright: 'All rights reserved.'
		},
		home: {
			description: 'Composer, Keyboard Player'
		},
		about: {
			quote1: '당신의 이야기 속 감정과 순간을 음악으로 섬세히 그려내는 작곡가입니다.',
			quote2:
				'풍부한 서사성을 담은 사운드를 기반으로 오케스트라부터 록·재즈까지<br>다양한 장르를 아우르는 맞춤형 음악을 제공합니다.',
			intro1:
				"넥슨 ‘블루아카이브’ 페스티벌, 라이브 아이돌 그룹 ‘IHOTEU’ 라이브,<br>버츄얼 유튜버 음원 제작 등 다양한 프로젝트 경험을 보유한 작곡가입니다.",
			intro2:
				'어쿠스틱부터 메탈, 재즈까지 장르를 넘나드는 폭 넓은 제작 경험과<br>지속적인 연구 기술을 바탕으로 클라이언트의 비전을 음악적으로 실현하는<br>맞춤형 솔루션을 제공합니다',
			workHistory: 'Work History',
			worksList: [
				"IHOTEU 1st Anniversary : ‘BAND SET ONE MAN LIVE’ 오프닝 음원 총괄 제작, 키보드 세션 참여",
				"넥슨게임즈 ‘블루 아카이브’ 0.5주년 페스티벌 ‘사운드 아카이브’ 음악회 키보드 세션 참여",
				"상하이 Blue Archive 동인 Only 전시회 1.0 ‘Blue Archive 2주년 게헨나 특별 파티 동인전’ 편곡, 키보드 세션, 무대 행사 진행 기획 참여",
				"블루 아카이브 비공식 페스티벌 ‘몰루제’ 편곡, 키보드 세션, 무대 행사 진행 기획 참여",
				"프로젝트팀 ‘리브라(Libra)’ 키보디스트/작곡가   버츄얼 유튜버 ‘NyuMoon’ Main BGM (2곡) 음원 총괄 제작 참여",
				"버츄얼 유튜버 ‘엘시(Elsea)’ 1주년 콘서트 행사 음원 (2곡) 편곡 참여",
				"버츄얼 유튜버 ‘한결(Hangyeol)’ 앨범 - 나의 우주(My Universe) 편곡 참여",
				"아프리카TV(현 SOOP), 타요 주최 ‘우리가 아이돌’ 4차 서바이벌 오디션 편곡, 키보드 세션 참여",
				"SNS코믹 ‘이웃집 남동생이 초등학생인데 너무 잘해! 엔딩 테마 ‘운명’ 편곡 참여",
				"블루아카이브 동인 어레인지 앨범 ‘KIVOTOS OF ROCK’ 편곡 참여",
				"블루아카이브 동인 어레인지 앨범 ‘Schale Jazz Lab’ 편곡 참여",
				'백제예대 실용음악과 졸업'
			]
		},
		works: {
			song: 'Song',
			bgm: 'BGM',
			original: 'Original',
			arrange: 'Arrange'
		},
		contact: {
			title: 'Contact',
			name: 'Name:',
			email: 'Email:',
			message: 'Message:',
			submit: 'Submit',
			success: '이메일이 전송되었습니다!',
			error: '이메일 전송에 실패했습니다. 다시 시도해주세요.'
		},
		music: {
			play: 'Play',
			pause: 'Pause',
			volume: 'Volume'
		}
	},
	en: {
		language: {
			srLabel: 'Select language',
			ko: 'Korean',
			en: 'English',
			ja: 'Japanese',
			zh: 'Chinese'
		},
		nav: {
			home: 'Home',
			about: 'About',
			works: 'Works',
			contact: 'Contact',
			ariaLabel: 'Main navigation'
		},
		theme: {
			switchToLight: 'Switch to light mode',
			switchToDark: 'Switch to dark mode'
		},
		footer: {
			copyright: 'All rights reserved.'
		},
		home: {
			description: 'Composer, Keyboard Player'
		},
		about: {
			quote1: 'A composer who delicately paints the emotions and moments in your story through music.',
			quote2:
				'Building on richly narrative soundscapes, I deliver tailor-made music that spans genres from orchestral to rock and jazz.',
			intro1:
				"A composer with experience across projects such as Nexon's 'Blue Archive' festival, live idol group 'IHOTEU' performances, and producing tracks for virtual YouTubers.",
			intro2:
				'Drawing on production experience that spans acoustic to metal and jazz, I provide bespoke musical solutions that bring each client’s vision to life.',
			workHistory: 'Work History',
			worksList: [
				"IHOTEU 1st Anniversary: 'BAND SET ONE MAN LIVE' opening track lead production and keyboard session.",
				"Nexon Games 'Blue Archive' 0.5 Anniversary Festival concert 'Sound Archive' keyboard session participation.",
				"Shanghai Blue Archive Doujin Only Exhibition 1.0 'Blue Archive 2nd Anniversary Gehenna Special Party' arrangement, keyboard session, and stage event planning.",
				"Blue Archive unofficial festival 'Molluje' arrangement, keyboard session, and stage event planning.",
				"Keyboardist/composer for project team 'Libra'; lead production of two main BGM tracks for VTuber 'NyuMoon'.",
				"Arranged two tracks for VTuber 'Elsea' 1st anniversary concert event.",
				"Arranged 'My Universe' on VTuber 'Hangyeol' album.",
				"AfreecaTV (now SOOP) & Tayo's 'We Are Idol' 4th survival audition arrangement and keyboard session.",
				"SNS comic 'My Neighbor Little Brother Is an Elementary Schooler but He's Amazing!' ending theme 'Destiny' arrangement.",
				"Blue Archive doujin arrange album 'KIVOTOS OF ROCK' arrangement.",
				"Blue Archive doujin arrange album 'Schale Jazz Lab' arrangement.",
				'Graduated from Paekche Institute of the Arts, Department of Practical Music.'
			]
		},
		works: {
			song: 'Song',
			bgm: 'BGM',
			original: 'Original',
			arrange: 'Arrange'
		},
		contact: {
			title: 'Contact',
			name: 'Name',
			email: 'Email',
			message: 'Message',
			submit: 'Submit',
			success: 'Email sent successfully!',
			error: 'Failed to send the email. Please try again.'
		},
		music: {
			play: 'Play',
			pause: 'Pause',
			volume: 'Volume'
		}
	},
	ja: {
		language: {
			srLabel: '言語を選択',
			ko: '韓国語',
			en: '英語',
			ja: '日本語',
			zh: '中国語'
		},
		nav: {
			home: 'ホーム',
			about: '紹介',
			works: '作品',
			contact: 'お問い合わせ',
			ariaLabel: 'メインナビゲーション'
		},
		theme: {
			switchToLight: 'ライトモードに切り替え',
			switchToDark: 'ダークモードに切り替え'
		},
		footer: {
			copyright: 'All rights reserved.'
		},
		home: {
			description: '作曲家・キーボードプレイヤー'
		},
		about: {
			quote1: 'あなたの物語に宿る感情と瞬間を音楽で繊細に描き出す作曲家です。',
			quote2:
				'豊かな物語性を備えたサウンドを基に、オーケストラからロック・ジャズまで幅広いジャンルのオーダーメイド音楽を提供します。',
			intro1:
				"ネクソン『ブルーアーカイブ』フェスティバルやライブアイドルグループ『IHOTEU』のライブ、VTuber楽曲制作など、多様なプロジェクト経験を持つ作曲家です。",
			intro2:
				'アコースティックからメタル、ジャズまで幅広い制作経験と継続的な研究を基に、クライアントのビジョンを音楽で具現化するオーダーメイドのソリューションを提供します。',
			workHistory: '活動経歴',
			worksList: [
				"IHOTEU 1st Anniversary「BAND SET ONE MAN LIVE」オープニング楽曲の総合制作およびキーボードセッション参加。",
				"ネクソンゲームズ『ブルーアーカイブ』0.5周年フェスティバル『Sound Archive』コンサートでキーボードセッションとして参加。",
				"上海 Blue Archive 同人 Only 展 1.0『Blue Archive 2周年ゲヘナ特別パーティー』で編曲・キーボードセッション・ステージ企画に参加。",
				"ブルーアーカイブ非公式フェス『몰루제（モルジェ）』で編曲・キーボードセッション・ステージ進行企画に参加。",
				"プロジェクトチーム『Libra』でキーボーディスト／作曲家として活動し、VTuber『NyuMoon』メインBGM（2曲）の総合制作に参加。",
				"VTuber『Elsea』1周年コンサート用楽曲（2曲）の編曲に参加。",
				"VTuber『한결（Hangyeol）』のアルバム『My Universe』の編曲に参加。",
				"AfreecaTV（現 SOOP）・タヨ主催『私たちがアイドル』第4次サバイバルオーディションで編曲およびキーボードセッションに参加。",
				"SNSコミック『隣の弟くんは小学生なのにすごすぎる！』エンディングテーマ『運命』の編曲に参加。",
				"ブルーアーカイブ同人アレンジアルバム『KIVOTOS OF ROCK』で編曲に参加。",
				"ブルーアーカイブ同人アレンジアルバム『Schale Jazz Lab』で編曲に参加。",
				'百済芸術大学 実用音楽科 卒業。'
			]
		},
		works: {
			song: 'ソング',
			bgm: 'BGM',
			original: 'オリジナル',
			arrange: 'アレンジ'
		},
		contact: {
			title: 'お問い合わせ',
			name: 'お名前',
			email: 'メールアドレス',
			message: 'メッセージ',
			submit: '送信',
			success: 'メールが送信されました！',
			error: 'メールの送信に失敗しました。もう一度お試しください。'
		},
		music: {
			play: '再生',
			pause: '一時停止',
			volume: '音量'
		}
	},
	zh: {
		language: {
			srLabel: '选择语言',
			ko: '韩语',
			en: '英语',
			ja: '日语',
			zh: '中文'
		},
		nav: {
			home: '首页',
			about: '简介',
			works: '作品',
			contact: '联系',
			ariaLabel: '主导航'
		},
		theme: {
			switchToLight: '切换为浅色模式',
			switchToDark: '切换为深色模式'
		},
		footer: {
			copyright: '版权所有。'
		},
		home: {
			description: '作曲家、键盘演奏者'
		},
		about: {
			quote1: '我是位以音乐细腻描绘您故事中情感与瞬间的作曲家。',
			quote2:
				'以充满叙事感的声音为基础，提供涵盖管弦、摇滚、爵士等多种风格的定制音乐。',
			intro1:
				"曾参与 Nexon《蔚蓝档案》祭典、偶像团体 'IHOTEU' 的现场演出，以及虚拟 YouTuber 音源制作等多样项目的作曲家。",
			intro2:
				'凭借横跨原声、金属、爵士等广泛的制作经验与持续的研究，为客户提供将愿景化为音乐的定制解决方案。',
			workHistory: '工作经历',
			worksList: [
				"IHOTEU 一周年『BAND SET ONE MAN LIVE』演出开场音源统筹制作及键盘演奏。",
				"Nexon Games《蔚蓝档案》0.5 周年庆典音乐会『Sound Archive』键盘演奏。",
				"上海《蔚蓝档案》同人 Only 展 1.0『2 周年盖赫纳特别派对』负责编曲、键盘演奏与舞台活动策划。",
				"《蔚蓝档案》非官方祭典『몰루제』负责编曲、键盘演奏与舞台活动策划。",
				"项目团队『Libra』键盘手／作曲家；参与虚拟 YouTuber『NyuMoon』两首主题 BGM 的统筹制作。",
				"参与虚拟 YouTuber『Elsea』一周年演唱会活动两首曲目的编曲。",
				"参与虚拟 YouTuber『한결（Hangyeol）』专辑《My Universe》的编曲。",
				"为 AfreecaTV（现 SOOP）与 Tayo 主办的《我们是偶像》第四次生存试镜负责编曲并参与键盘演奏。",
				"为 SNS 漫画《隔壁的小弟是小学生却超厉害！》片尾曲《运命》编曲。",
				"参与《蔚蓝档案》同人改编专辑《KIVOTOS OF ROCK》的编曲。",
				"参与《蔚蓝档案》同人改编专辑《Schale Jazz Lab》的编曲。",
				'毕业于百济艺术大学实用音乐系。'
			]
		},
		works: {
			song: '歌曲',
			bgm: '配乐',
			original: '原曲',
			arrange: '改编'
		},
		contact: {
			title: '联系',
			name: '姓名',
			email: '邮箱',
			message: '留言',
			submit: '发送',
			success: '邮件发送成功！',
			error: '邮件发送失败，请重试。'
		},
		music: {
			play: '播放',
			pause: '暂停',
			volume: '音量'
		}
	}
};

const resolvePath = (locale: Locale, key: string): TranslationNode | undefined => {
	const segments = key.split('.');
	let current: TranslationNode | undefined = dictionary[locale];

	for (const segment of segments) {
		if (!current || typeof current !== 'object' || Array.isArray(current)) {
			return undefined;
		}
		current = current[segment];
	}

	return current;
};

const applyTemplate = (value: string, vars: Record<string, string>) =>
	Object.entries(vars).reduce(
		(result, [token, replacement]) =>
			result.replace(new RegExp(`{{\\s*${token}\\s*}}`, 'g'), replacement),
		value
	);

const resolveString = (locale: Locale, key: string, vars: Record<string, string>) => {
	const value = resolvePath(locale, key);

	if (typeof value === 'string') {
		return applyTemplate(value, vars);
	}

	return undefined;
};

const resolveList = (locale: Locale, key: string) => {
	const value = resolvePath(locale, key);

	if (Array.isArray(value)) {
		return value;
	}

	return undefined;
};

const localeStore = writable<Locale>('ko');

if (browser) {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (isLocale(stored)) {
		localeStore.set(stored);
	}
}

localeStore.subscribe(($locale) => {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, $locale);
	}
});

export const locale = localeStore;

export const t = derived(locale, ($locale) => {
	return (key: string, vars: Record<string, string> = {}) => {
		return (
			resolveString($locale, key, vars) ??
			resolveString('ko', key, vars) ??
			applyTemplate(key, vars)
		);
	};
});

export const tList = derived(locale, ($locale) => {
	return (key: string) => {
		return resolveList($locale, key) ?? resolveList('ko', key) ?? [];
	};
});

export const LANG_OPTIONS: Array<{ code: Locale; label: string }> = [
	{ code: 'ko', label: '한국어' },
	{ code: 'en', label: 'English' },
	{ code: 'ja', label: '日本語' },
	{ code: 'zh', label: '中文' }
];

export const switchLocale = (next: Locale) => {
	locale.update((current) => {
		if (current === next) {
			return current;
		}

		return next;
	});
};
