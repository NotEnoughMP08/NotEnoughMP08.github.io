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
                "프로젝트팀 ‘리브라(Libra)’ 키보디스트/작곡가로서 버츄얼 유튜버 ‘NyuMoon’ Main BGM (2곡) 음원 총괄 제작 참여",
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
            quote1: 'A composer who delicately expresses the emotions and moments within your story through music.',
            quote2:
                'Based on richly narrative sound, I provide tailor-made compositions across genres from orchestral to rock and jazz.',
            intro1:
                "A composer experienced in projects such as Nexon's 'Blue Archive' festival, live performances with idol group 'IHOTEU', and production for virtual YouTubers.",
            intro2:
                'With extensive experience from acoustic to metal and jazz, and ongoing technical research, I deliver custom musical solutions that bring each client’s vision to life.',
            workHistory: 'Work History',
            worksList: [
                "IHOTEU 1st Anniversary: 'BAND SET ONE MAN LIVE' – lead producer and keyboard session performer.",
                "Nexon Games 'Blue Archive' 0.5th Anniversary Festival concert 'Sound Archive' – keyboard session performer.",
                "Shanghai Blue Archive Doujin Only Exhibition 1.0: '2nd Anniversary Gehenna Special Party' – arrangement, keyboard session, and event planning.",
                "Blue Archive unofficial festival 'Molluje' – arrangement, keyboard session, and event planning.",
                "Keyboardist / composer in project team 'Libra'; lead producer for two main BGM tracks for VTuber 'NyuMoon'.",
                "Arranged two tracks for VTuber 'Elsea' 1st anniversary concert.",
                "Arranged 'My Universe' for VTuber 'Hangyeol’ album.",
                "Arranged and performed keyboard for AfreecaTV (now SOOP) x Tayo’s 4th survival audition show 'We Are Idol'.",
                "Arranged ending theme 'Destiny' for the SNS comic 'My Neighbor Little Brother Is an Elementary Schooler but He's Amazing!'.",
                "Arranged tracks for Blue Archive doujin albums 'KIVOTOS OF ROCK' and 'Schale Jazz Lab'.",
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
            success: 'Email successfully sent!',
            error: 'Failed to send email. Please try again.'
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
            quote1: 'あなたの物語に込められた感情や瞬間を、音楽で繊細に描き出す作曲家です。',
            quote2:
                '豊かな物語性をもつサウンドを基に、オーケストラからロック、ジャズまで幅広いジャンルのオーダーメイド音楽を提供します。',
            intro1:
                "ネクソン『ブルーアーカイブ』フェスティバルやアイドルグループ『IHOTEU』のライブ、VTuber音源制作など、多彩なプロジェクトに携わってきた作曲家です。",
            intro2:
                'アコースティックからメタル、ジャズまで幅広い制作経験と、継続的な研究を通して、クライアントのビジョンを音楽で具現化するカスタムソリューションを提供します。',
            workHistory: '活動経歴',
            worksList: [
                "IHOTEU 1周年記念「BAND SET ONE MAN LIVE」オープニング楽曲の総合制作とキーボード演奏を担当。",
                "ネクソンゲームズ『ブルーアーカイブ』0.5周年フェスティバル『Sound Archive』コンサートにキーボードセッションとして参加。",
                "上海 Blue Archive 同人展 1.0『2周年ゲヘナ特別パーティー』で編曲、キーボード演奏、ステージ企画を担当。",
                "ブルーアーカイブ非公式イベント『몰루제（モルジェ）』で編曲、キーボード演奏、ステージ運営を担当。",
                "プロジェクトチーム『Libra』のキーボーディスト／作曲家として、VTuber『NyuMoon』のメインBGM（2曲）の総合制作に参加。",
                "VTuber『Elsea』1周年コンサート楽曲（2曲）の編曲を担当。",
                "VTuber『한결（Hangyeol）』のアルバム『My Universe』の編曲を担当。",
                "AfreecaTV（現SOOP）とTayo主催の『私たちはアイドル』第4次サバイバルオーディションで編曲とキーボード演奏を担当。",
                "SNSコミック『隣の弟くんは小学生なのにすごすぎる！』エンディングテーマ『運命』の編曲を担当。",
                "ブルーアーカイブ同人アレンジアルバム『KIVOTOS OF ROCK』『Schale Jazz Lab』の編曲を担当。",
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
            success: 'メールを送信しました！',
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
            switchToLight: '切换至浅色模式',
            switchToDark: '切换至深色模式'
        },
        footer: {
            copyright: '版权所有。'
        },
        home: {
            description: '作曲家・键盘演奏者'
        },
        about: {
            quote1: '一位以音乐细腻描绘您故事中情感与瞬间的作曲家。',
            quote2:
                '以富有叙事感的声音为基础，提供涵盖管弦乐、摇滚及爵士等多种风格的定制音乐。',
            intro1:
                "参与过 Nexon《蔚蓝档案》节日活动、偶像团体“IHOTEU”的现场演出，以及虚拟 YouTuber 曲目制作等多个项目的作曲家。",
            intro2:
                '凭借横跨原声、金属与爵士等广泛的制作经验和持续研究，为客户提供将愿景化为音乐的定制化解决方案。',
            workHistory: '工作经历',
            worksList: [
                "IHOTEU 一周年『BAND SET ONE MAN LIVE』开场音乐统筹制作及键盘演奏。",
                "Nexon Games《蔚蓝档案》0.5 周年音乐会『Sound Archive』键盘演奏。",
                "上海《蔚蓝档案》同人展 1.0『2周年盖赫纳特别派对』编曲、键盘演奏及活动策划。",
                "《蔚蓝档案》非官方祭典『몰루제』编曲、键盘演奏及舞台企划。",
                "项目组『Libra』键盘手／作曲家；统筹制作虚拟 YouTuber『NyuMoon』两首主 BGM。",
                "为虚拟 YouTuber『Elsea』一周年演唱会编曲两首歌曲。",
                "为虚拟 YouTuber『한결（Hangyeol）』专辑《My Universe》进行编曲。",
                "为 AfreecaTV（现 SOOP）与 Tayo 主办的《我们是偶像》第四次生存赛担任编曲与键盘演奏。",
                "为 SNS 漫画《隔壁的小弟是小学生却超厉害！》片尾曲《命运》进行编曲。",
                "参与《蔚蓝档案》同人改编专辑《KIVOTOS OF ROCK》《Schale Jazz Lab》的编曲。",
                '毕业于百济艺术大学实用音乐系。'
            ]
        },
        works: {
            song: '歌曲',
            bgm: '配乐',
            original: '原创',
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
    if (typeof value === 'string') return applyTemplate(value, vars);
    return undefined;
};

const resolveList = (locale: Locale, key: string) => {
    const value = resolvePath(locale, key);
    if (Array.isArray(value)) return value;
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
    locale.update((current) => (current === next ? current : next));
};
