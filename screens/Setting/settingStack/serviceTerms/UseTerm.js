import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../../../styles";

const UseTerm = () => {
  return (
    <ScrollView>
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>제1조 (목 적)</Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          이 약관은 쉐어플랜에서 제공하는 서비스를 이용함에 있어 쉐어플랜과
          이용자와의 권리/의무 및 책임사항 및 운영정책 등 기타 필요한 사항을
          규정함을 목적으로 합니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제2조 (용어정의)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. "쉐어플랜" : 사용자들에게 목표 및 자기계발 등을 위한 편리기능 및
          커뮤니티를 제공하며, 상호간에 정보, 감정 및 습관 등을 교류하여
          개개인의 삶의 질을 향상시키기 위한 서비스를 제공합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. "회원"이라 함은 "쉐어플랜"에 개인정보를 제공하여 회원등록을 한
          자로서, "쉐어플랜"의 정보를 지속적으로 제공받으며, "쉐어플랜"이
          제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. "이메일"이라 함은 회원이 식별과 서비스 이용을 위하여 회원이
          선택하고 "쉐어플랜"에서 승인한 이메일 주소를 말합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. "닉네임"이라 함은 사용자가 선택하고, "쉐어플랜"에서 승인한
          닉네임이며, 서비스를 이용하면서 사용자간에 서로를 식별하는 호칭으로써
          사용됩니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. "목표카드"이라 함은 사용자의 목표, 디데이, 카테고리 등을 기입하여
          생성하여, 개인의 목표에 대한 정보를 담고있습니다. 목표카드 내에는
          목표를 위한 노력(history) 및 관련 정보(Information)를 담을 수 있으며
          목표카드 및 내부정보를 비공개 설정을 하여 정보 보호가 가능합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. "히스토리"이라 함은 개인이 목표를 달성해나가는 과정을 기록하기 위한
          기능으로 각 스케쥴을 수행하면서 해당 내용에 대하여 게시할 수 있습니다.
          정보제공의 의미로는 달성을 위한 팁을 제공할 수 있으며, 기록의 의미로
          개인의 성취감을 높일 수 있는 수단입니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. "다운로드(공유)"라 함은 사용자의 목표에 대한 스케쥴을 다운로드하여
          자기 자신의 스케쥴로 반영할 수 있습니다. 수정이 자유롭게 가능하며,
          다운로드 한 목표카드의 경우 다시 재공유를 할 수 없습니다.
        </Text>
        {/* <Text style={{ marginTop: 7 }}>
          4. "소울링"이라 함은 사용자가 
        </Text>
        <Text style={{ marginTop: 7 }}>
          4. "소울러"이라 함은 "쉐어플랜"에 개인정보를 제공하여 회원등록을 한
          자로서, "쉐어플랜"의 정보를 지속적으로 제공받으며, "쉐어플랜"이
          제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다
        </Text> */}
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제3조 (약관 등의 명시와 설명 및 개정)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. "쉐어플랜"은 법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로
          본 약관이나 이용방법, 도움말, 운영정책 및 안내/공지사항 등에 대한
          수정이 가능합니다. (본 약관의 변경사항은 서비스 내 "공지사항"에서
          알려드립니다.)
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. "쉐어플랜"에서 약관을 개정할 경우에는 적용일자 및 개정사유를
          명시하여 Home화면 상단에 최소 적용일자 7일 이전부터 적용일자 전일까지
          공지합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 위 두항에 따라 공지된 적용일자 이후에 회원이 "쉐어플랜"이 제공하는
          서비스를 계속 이용하는 경우에는 개정된 약관에 동의하는 것으로
          간주합니다. 개정된 약관에 동의하지 아니하는 회원은 언제든지 자유롭계
          이용계약을 해지할 수 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 정보가
          제한한 전자상거래 등에서의 소비자보호지침 및 관련법령 또는 상 관례에
          따릅니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 본 약관의 일부가 집행불능으로 판단되더라도 나머지 부분은 계속해서
          효력을 갖습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제4조 (이용신청 및 승낙)
        </Text>

        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 회원이 되고자 하는 자는(가입신청자) 최초 서비스 실행 시 고지되는
          이용약관에 동의하고 가입양식에 따라 회원정보를 기입한 후 가입 의사를
          표시함으로써 이용계약을 신청합니다.
        </Text>
        <Text style={{ marginTop: 10, fontSize: 12 }}>
          2. 회사는 다음 각 호에 해당하는 이용신청에 대하여 이를 승낙하지
          아니하거나, 사후에 이용계약을 해지 할 수 있습니다.
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적 있는
            경우 (단, 회사의 회원 재가입 승낙을 얻은 경우에는 예외로 함)
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 타인의 명의를 도용하거나, 회사가 제시하는 내용의 허위, 기재누락,
            오기가 있는 경우
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반
            사항을 위반하여 신청한 경우
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 부정한 용도 또는 영리를 추구할 목적으로 본 서비스를 이용하고자
            하는 경우
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 부정한 용도 또는 영리를 추구할 목적으로 본 서비스를 이용하고자
            하는 경우
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 관련법령에 위배되거나 사회의 안녕질서 혹은 미풍양속을 저해할 수
            있는 목적으로 신청한 경우
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 기타 이 약관에 위배되거나 위법 또는 부당한 이용신청임이 확인된
            경우 및 회사가 합리적인 판단에 의하여 이용신청 거절 또는 이용계약
            해지가 필요하다고 판단하는 경우, 이용신청의 거절 또는 이용계약을
            해지할 수 있습니다.
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제5조 (회원정보의 수정)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 회원은 서비스 내 "계정관리"를 통하여 언제든지 본인의 가입정보를
          열람하고 수정할 수 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 서비스 관리를 위해 필요한 고유정보(이메일 등)은 수정이
          불가능합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 기술상 또는 업무상 문제로 프로필의 갱신은 즉시 완료되지 않을 경우가
          있으며, 이로부터 발생하는 불이익에 대하여 회사는 책임지지 않습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 6 조 (회원 정보의 관리에 대한 의무 및 고지)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 제2조 3,4항에서 정하는 이메일과 소셜로그인 계정에 대한 관리책임은
          회원에게 있습니다. 회원은 이메일 및 소셜로그인 계정을 제3자에게
          알려주거나 양도하여서는 안됩니다. 회원이 이메일과 소셜로그인을
          제3자에게 알려줌으로써 발생한 손해에 대해서는 쉐어플랜에서 책임을 지지
          않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 이메일과 소셜로그인 계정이 회원의 의사에 반하여 유출되거나 기타의
          사정으로 제3자가 사용하고 있음을 인지한 경우 즉시 쉐어플랜에 통보한
          다음 안내를 따라야 합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 회원의 제2항의 경우에 해당 회원이 쉐어플랜에 그 사실을 통지하지
          않거나, 통지한 경우에도 쉐어플랜의 안내에 따르지 않아 발생한 불이익에
          대하여 회사는 그 어떠한 책임도 지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 회원의 가입과 탈퇴가 포함된 전체 서비스 활동내역과 관련된 로그
          요청은 관련법령에 의한 제출의무를 제외하고 당사자를 불문하고
          공개해드리지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 본 서비스는 목표 카테고리 및 정보교류를 위한 서비스로 회원의 프로필
          정보는 누구에게나 공개될 수 있습니다. 공개가 불편하거나 유출의 위험이
          있는 내용은 비공개 설정 및 유지를 하거나 게재하지 않으셔야 하고 이
          외에 발생된 불이익에 대하여 회사는 책임지지 않습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 7 조 (회사의 의무)
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          1. 회사는 관련법령과 이 약관이 금지하거나 공공질서, 미풍양속에 반하는
          행위를 하지 않으며, 이 약관이 정하는 바에 따라 지속적이고 안정적으로
          서비스를 제공하기 위하여 최선을 다하여야 합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회사는 이용자가 안전하게 서비스를 이용할 수 있도록 이용자의
          개인정보(신용정보 포함) 보호를 위한 보안 시스템을 갖추어야 하며
          개인정보 취급방침을 공시하고 준수하여야 합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 회사는 관련법령이 정한 의무사항을 준수합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 회사는 서비스이용과 관련하여 회원으로부터 제기된 의견이나 불만이
          정당하다고 인정할 경우에는 이를 처리하여야 합니다. 회원이 제기한
          의견이나 불만사항에 대해서는 전자우편 등을 통하여 전달받습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 8 조 (회원의 의무)
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          1. 회원은 관계법령, 이 약관의 규정, 이용안내 등 회사가 통지하는 사항을
          준수하여야 하며, 기타 타인의 권익을 침해하거나, 회사 업무에 방해되는
          행위를 하여서는 안됩니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 타인의 정보도용 및 사칭
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 허위내용의 등록 및 회사가 게시한 정보의 허가 받지 않은 변경
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회원간의 금전 거래 또는 사기, 기만 등 현행법에 위배되는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회사의 서비스에 게시된 정보 또는 회원이 서비스를 이용하여 얻은
            정보를 회사의 사전 승낙 없이 영리 또는 비영리의 목적으로 복제, 출판,
            방송 등에 사용하거나 제3자에게 제공하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회사의 사전 허락없이 영리의 목적으로 서비스를 이용하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 외설, 음란, 폭력 등 기타 현행법 및 미풍양속에 반하는 행동 혹은
            내용을 서비스에 게시하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 불건전 교제 조장 혹은 매개하기 위한 목적으로 이용하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회사 및 제3자의 저작권 등 지적재산권에 대한 침해 하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 본인이 아닌 제3자에게 접속권한을 부여하는 등, 계정보안에 위험을
            초래하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 다른 회원의 이메일 또는 소셜로그인 계정을 도용하여 서비스를
            이용하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 서비스를 이용할 권리를 양도하고 이를 대가로 금전을 수수하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 홍보를 목적으로 목표카드를 반복적으로 생성하며 서비스 운영에
            지장을 주는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 청소년보호법에서 규정하는 청소년유해매체물을 게시(링크 포함)하는
            행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 외설 또는 폭력적인 메시지, 동영상, 음성 기타 공공질서, 미풍양속에
            반하는 정보, 문장, 도형, 동영상, 음성 등 사이트에 공개, 게시 또는
            다른 이용자에게 유포하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 외설 또는 폭력적인 메시지, 동영상, 음성 기타 공공질서, 미풍양속에
            반하는 정보, 문장, 도형, 동영상, 음성 등 사이트에 공개, 게시 또는
            다른 이용자에게 유포하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회사의 직원이나 서비스의 관리자로 가장, 사칭하거나 타인의 명의를
            도용하여 글을 게시하거나 메일을 발송하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 스토킹, 욕설, 채팅글 도배 등 다른 회원의 서비스 이용을 방해하는
            행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 다른 회원의 개인정보를 그 동의 없이 수집, 저장, 공개, 유포하는
            행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 리버스엔지니어링, 디컴파일, 디스어셈블 및 기타 일체의 가공행위를
            통하여 서비스를 복제, 분해 또는 모방 기타 변형하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 자동 접속 프로그램 등을 사용하는 등 비정상적인 방법으로 서비스를
            이용하여 회사의 서버에 부하를 일으켜 회사의 정상적인 서비스를
            방해하는 행위
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 기타 본 항에 준하는 경우나 회사가 판단하기에 운영정책에 위배되거나
            서비스에 위협이 되는 행위
          </Text>
        </View>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 회원은 관계법, 이 약관의 규정, 이용안내 및 서비스와 관련하여 공지한
          주의사항, 운영정책을 준수하여야 하며 이를 위반한 회원의 경우 회사는
          임의로 회원과의 이용계약을 해지하거나 서비스 이용을 제한할 수
          있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 회원은 본 약관을 위배한 회원을 회사 측에 신고할 수 있으며
          민형사상급의 처벌 문제를 제외한 본 약관 위배에 대한 서비스 이용 제한
          여부와 방법은 회사가 판단합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 회사는 신고 내용에 대한 증거자료를 회원에게 요청할 수 있으며 만약
          허위 신고로 판명될 경우, 신고한 회원은 서비스 이용에 제한이 있을 수
          있습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 9 조 (회원에 대한 통지)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 회사가 회원에 대한 통지가 필요한 경우 별도의 규정이 없는 한 서비스
          가입시 연결된 소셜로그인의 이메일을 통해 통지할 수 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회사는 회원전체에 대한 통지가 필요한 경우에는 7일 이상 서비스내
          “공지사항” 화면에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 10 조 (서비스의 제공)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 서비스의 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한
          연중무휴 1일 24시간을 원칙으로 합니다. 다만 정기점검 등의 필요로
          회사가 정한 날 또는 시간은 제외됩니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회사는 다음 각호에 해당하는 경우 서비스 제공을 중지할 수 있습니다.
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 서비스용 하드웨어, 소프트웨어 등의 보수, 정기 및 비상 점검의 경우
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를
            중지했을 경우
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 기타 불가항력적 사유가 있는 경우
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주
            등으로 정상적인 서비스 이용에 지장이 있는 경우
          </Text>
        </View>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 서비스는 무선네트워크 환경에서의 빠른 서비스 제공을 위해 회원의
          공개된 정보등을 자동으로 스마트폰에 캐싱하고 변경사항 또한
          동기화합니다. 이에 동의하지 않으실 경우 서비스를 이용하실 수 없습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 회원이 변경 또는 삭제한 정보는 서비스 서버에 반영됩니다. 다만, 제
          3자의 스마트폰 또는 모바일 디바이스에 캐싱된 정보는 변경 또는 삭제되지
          않을 수 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 서비스 내의 모든 기능은 회사 운영방침에 따라 임의로 변경될 수
          있습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 11 조 (게시물의 관리)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 서비스에 등록된 모든 게시물이 약관의 규정, 운영정책에 위배되는
          경우, 또는 회사에 의한 자체 모니터링에 의해 불건전한 콘텐츠가 업로드
          된 경우 관련법에 따라 회사는 게시물을 임의로 비공개 또는 삭제 처리할
          수 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회원이 이용계약을 해지하거나 회사에 의해 이용계약이 해지되는 경우
          본인 계정의 개인정보, 게시물, 댓글 등 모든 정보가 삭제됩니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 모든 게시물은 등록한 회원에게 관리의 책임이 있으며, 회사는 이에
          대한 백업이나 권리를 보장하지 않습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 12 조 (게시물의 저작권)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의
          저작자에게 귀속됩니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회원이 서비스 내에 게시한 게시물은 검색결과에 노출 될 수 있으며
          회원은 서비스 내 관리기능을 통해 비공개 및 해당 게시물을 삭제할 수
          있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 회사는 서비스 제공을 위해 게시물을 서버에 저장, 보관할 수 있고,
          회원의 법령, 운영정책에 위반되는 사실이 확인되는 경우, 회원 간의 분쟁
          조정, 민원처리, 또는 질서 유지를 위해서 열람할 수 있지만 법령에서 정한
          경우를 제외하고 제 3자에게 절대 제공하지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 회사는 전항에 따라 게시물을 열람하는 경우 관련 내용과 관계되는
          회원에게 고지합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 회원의 게시물이 “정보통신망법” 및 “저작권법”등 관련법에 위반되는
          내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당
          “게시물”의 게시중단 및 삭제 등을 요청할 수 있으며, 회사는 관련법에
          따라 조치를 취합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 회원의 게시물이 “정보통신망법” 및 “저작권법”등 관련법에 위반되는
          내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당
          “게시물”의 게시중단 및 삭제 등을 요청할 수 있으며, 회사는 관련법에
          따라 조치를 취합니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 16 조 (서비스의 변경)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라
          제공하고 있는 서비스의 전부 또는 일부를 변경 또는 중단할 수 있으며,
          이에 대하여 관련법에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지
          않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 서비스의 내용, 이용방법, 이용시간에 대하여 변경 또는 서비스 중단이
          있을 때 회사 측이 판단하여 필요한 경우 변경 또는 중단될 서비스의
          내용에 대하여 서비스 내 “공지사항” 화면 등 회원이 충분히 인지할 수
          있는 방법으로 게시합니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 17 조 (권리의 귀속)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 서비스에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 단, 회원의
          게시물 및 제휴계약에 따라 제공된 저작물 등은 제외합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회사가 제공하는 서비스의 디자인, 회사가 만든 텍스트, 스크립트,
          그래픽, 회원 상호간 전송 기능 등 회사가 제공하는 서비스에 관련된 모든
          상표, 서비스 마크, 로고 등에 관한 저작권 기타 지적재산권은 대한민국 및
          외국의 법령에 기하여 회사가 보유하고 있거나 회사에게 소유권 또는
          사용권이 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 회원은 본 이용약관으로 인하여 서비스를 소유하거나 서비스에 관한
          저작권을 보유하게 되는 것이 아니라, 회사로부터 서비스의 이용을 허락
          받게 되는바, 서비스는 정보취득 또는 개인용도로만 제공되는 형태로
          회원이 이용할 수 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 회원은 명시적으로 허락된 내용을 제외하고는 서비스를 통해 얻어지는
          회원 상태정보를 영리 목적으로 사용, 복사, 유통하는 것을 포함하여
          회사가 만든 텍스트, 스크립트, 그래픽의 회원 상호간 전송기능 등을
          복사하거나 유통할 수 없습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 회사는 서비스 운영과 보안을 위해 서비스 설계와 관련된 알고리즘은
          회원에게 알려드리지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 회사는 서비스와 관련하여 회원에게 회사가 정한 이용조건에 따라 계정,
          아이디, 콘텐츠 등을 이용할 수 있는 이용권만을 부여하며, 회원은 이를
          양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 18 조 (계약해지)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 회원은 언제든지 서비스 "회원탈퇴"를 통해서 이용계약을 해지 할 수
          있으며, 회사는 관련법에 따라 이를 즉시 처리하여야 합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회원이 계약을 해지할 경우, 관련법 및 개인정보취급방침에 따라 회사가
          회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 계정 데이터는
          소멸됩니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 19 조 (이용제한)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 회사는 회원이 본 약관의 의무를 위반하거나 서비스의 운영을 방해한
          경우 영구이용정지로 서비스 이용을 제한 할 수 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회사는 전항에도 불구하고, “주민등록법”을 위반한 명의도용 및
          결제도용, 전화번호 도용, “저작권법” 및 “컴퓨터프로그램보호법”을 위반한
          불법프로그램의 제공 및 운영방해, “정보통신망법”을 위반한 불법통신 및
          해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한
          경우에는 즉시 영구이용정지를 할 수 있습니다. 본 조에 따른
          영구이용정지시 서비스 이용을 통해 획득한 혜택 등도 모두 소멸되며,
          회사는 이에 대해 별도로 보상하지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 회사는 회원이 회사가 판단한 일정기간 이상 로그인하지 않는 경우,
          회원정보 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 회사의
          이용제한정책에서 정하는 바에 의합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 회원은 본 조에 따른 이용제한 등에 대해 회사가 정한 절차에 따라
          이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는
          경우 회사는 즉시 서비스 이용을 재개합니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 20 조 (책임제한)
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
          제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을
          지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          3. 회사는 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도,
          정확성 등의 내용에 관하여는 책임을 지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          4. 회사는 서비스 이용 과정에서 발생한 회원 간 또는 회원과 제3자
          상호간에 서비스를 매개로 하여 거래 등을 한 경우 책임을 지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          5. 회사는 서비스 이용 과정에서 온라인ㆍ오프라인을 불문하고 모임 내에
          발생한 회원 간의 분쟁, 명예훼손, 사기, 각종 민형사상의 문제 혹은 기타
          피해에 대하여 책임을 지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          6. 회사는 회사가 제공하는 모든 서비스 이용과 관련하여 관련법에 특별한
          규정이 없는 한 책임을 지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          7. 서비스 이용을 위해 무선네트워크(5G,LTE,3G,WiFi 등) 접속 시 가입하신
          요금제에 따라 별도 과금이 될 수 있으며 회사는 회원의 데이터 이용
          요금에 대해 책임지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          8. 회사는 제3자가 서비스 내 화면 또는 링크된 웹사이트를 통하여 광고한
          제품 또는 서비스의 내용과 품질에 대하여 감시할 의무 기타 어떠한 책임도
          지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          9. 회사 및 회사의 임직원 그리고 대리인은 다음과 같은 사항으로부터
          발생하는 손해에 대해 책임을 지지 않습니다.
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회원 상태정보의 허위 또는 부정확성에 기인하는 손해
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 그 성질과 경위를 불문하고 서비스에 대한 접속 및 서비스의
            이용과정에서 발생하는 개인적인 손해
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 서버에 대한 제3자의 모든 불법적인 접속 또는 서버의 불법적인
            이용으로부터 발생하는 손해
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 서버에 대한 전송 또는 서버로부터의 전송에 대한 제3자의 모든
            불법적인 방해 또는 중단행위로부터 발생하는 손해
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 제3자가 서비스를 이용하여 불법적으로 전송,유포되도록 한 모든
            바이러스, 스파이웨어 및 기타 악성 프로그램으로 인한 손해
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 전송된 데이터의 오류 및 생략, 누락, 파괴 등으로 발생되는 손해
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회원 상태정보 등록 및 서비스 이용 과정에서 발생하는 손해
          </Text>
        </View>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          10. 회사는 법령상 허용되는 한도 내에서 서비스와 관련하여 본 약관에
          명시되지 않은 어떠한 구체적인 사항에 대한 약정이나 보증을 하지
          않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          11. 회원이 자신의 개인정보를 타인에게 유출 또는 제공함으로써, 발생하는
          피해에 대해서 회사는 일절 책임을 지지 않습니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          12. 회사는 통신판매중개자로서 소행성을 기반으로 한 거래시스템만을
          제공할 뿐이며, 소행성의 거래시스템을 이용한 거래 내용에 관한 모든
          분쟁에 대해서는 당해 거래 당사자가 책임을 져야 합니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          제 21 조 (준거법 및 재판관할)
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          1. 회사와 회원간 제기된 소송은 대한민국법을 준거법으로 합니다.
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          2. 회사와 회원간 발생한 분쟁에 관한 소송은 민사소송법 상의 법원을
          관할법원으로 합니다.
        </Text>
      </View>
    </ScrollView>
  );
};

export default UseTerm;
