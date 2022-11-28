import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../../../styles";

const PrivacyPolicy = () => {
  return (
    <ScrollView>
      <View style={{ flex: 1, margin: 10 }}>
        <Text>
          쉐어플랜은 회원님의 개인정보를 보호하기 위해 최선을 다하고 있습니다.
          이를 위해서 회사는 개인정보의 보호와 관련하여 ‘정보통신망 이용촉진 및
          정보보호 등에 관한 법률’, ‘개인정보 보호법’ 등 개인정보와 관련된
          법령을 준수하고 있습니다. 귀하는 본 서비스를 사용함으로서 정보의 수집,
          전송, 조작, 저장, 공개 및 본 개인 정보 보호 정책에 명시된 귀하의
          정보를 제공하는 것에 대해 동의하게 됩니다. 귀하의 거주 국가나 정보의
          출처에 관계 없이, 귀하의 정보는 서비스가 운영되는 다른 모든 국가에서
          사용될 수 있습니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          1. 수집하는 개인정보의 항목 및 수집방법
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          가. 수집하는 개인정보의 항목
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          쉐어플랜에서는 원활한 서비스 제공과 더 나은 서비스를 만들기 위해
          다음과 같은 정보를 수집하고 있습니다.
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          회원가입(또는 서비스 가입), 원활한 고객상담, 각종 서비스의 제공을 위해
          서비스 최초 이용 시 아래의 필요한 개인정보를 수집하고 있습니다.
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 서비스 아이디(이메일), 비밀번호, 생년 및 나이, 성별
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 페이스북/구글 가입 또는 계정을 연동하는 경우 각 서비스에 연동된
            이메일 계정
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 사진 업로드를 위한 사진첩 접근 권한(선택)으로 미허가 시 사진
            업로드가 불가합니다.
          </Text>
        </View>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          나. 개인정보 수집방법
        </Text>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ marginTop: 20, fontSize: 12 }}>
            회사는 다음과 같은 방법으로 개인정보를 수집합니다.
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회원가입 시 기입되는 개인정보(이메일, 비밀번호, 생년, 성별) 수집
            사용 중 이용자의 자발적 제공을 통한 수집
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 사용 중 이용자의 자발적 제공을 통한 수집
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 사용 중 이용자의 권한 허가를 통한 수집(사진첩)
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          1. 개인정보의 수집 및 이용 목적
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          가. 서비스 기본 기능의 제공
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 무선네트워크 환경에서도 빠른 서비스를 제공하기 위해 회원의 공개된
            정보를 자동으로 스마트폰에 캐싱하고 변경사항 또한 동기화합니다.
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회원이 변경 또는 삭제한 정보는 서버에 반영됩니다. 다만, 제 3자의
            스마트폰 또는 모바일 디바이스에 캐싱된 정보는 변경 또는 삭제되지
            않을 수 있습니다.
          </Text>

          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 다른 사람들을 쉽게 찾고 교류할 수 있도록 설계되었습니다. 이 때문에
            회원님의 모든 프로필 정보는 누구에게나 공개될 수 있습니다. 공개되는
            것이 불편한 하거나 노출에 위험이 있는 내용은 프로필 등록을 피하시기
            바랍니다.
          </Text>
        </View>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          나. 회원관리
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 회원제 서비스 이용 및 제한적 본인 확인제에 따른 본인확인,
            개인식별, 불량회원(소행성 운영수칙을 위반하여 계약해지된
            영구이용정지 회원)의 부정 이용방지와 비인가 사용방지, 가입의사 확인,
            가입 및 가입횟수 제한, 만14세 미만 아동 개인정보 수집 시 법정 대리인
            동의여부 확인, 추후 법정 대리인 본인확인, 법령이나 이용약관을
            위반하여 발생하는 분쟁 조정을 위한 기록보존, 불만처리 등, 고지사항
            전달
          </Text>
        </View>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          다. 신규 서비스 개발 및 마케팅·광고 활용
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스
            제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 및 광고성 정보 제공
            및 참여기회 제공, 회원의 서비스 이용에 대한 통계와 분석
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          3. 개인정보의 보호 및 제공
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          회사는 이용자가 별도로 동의하지 않는 경우를 제외하고는 이용자의
          개인정보를 위에서 언급한 목적 범위를 초과하여 이용하거나 제3자에게
          제공 또는 공유하지 않습니다. 다만, 아래의 경우는 예외로 합니다.
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          가. 서비스에 제3자의 서비스가 연결되어 제공될 경우 회사는 서비스
          이용을 위해 필요한 범위 내의 제공에 대하여 이용자의 동의를 얻은 경우
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          나. 법령의 규정에 의거하여 정해진 절차와 방법에 따라 요청할 경우
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          4. 개인정보의 취급위탁
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          회사는 관계 법령에 따른 위탁계약 시 개인정보가 안전하게 관리될 수
          있도록 필요한 사항을 규정하고 있으니 안심하시기 바라며 회사의 개인정보
          위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.
        </Text>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 수탁자 : SKT, KT, LGU+ - 수탁업무 : 본인확인
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 수탁업무 : 본인확인
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          5. 개인정보의 보유 및 이용기간
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12 }}>
          이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면
          지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한
          기간 동안 보존합니다.
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          가. 회사 내부 방침에 의한 정보보유 사유
        </Text>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 부정이용기록
          </Text>
          <View style={{ marginRight: 17, marginLeft: 17 }}>
            <Text
              style={{
                marginTop: 7,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 이유 : 부정 이용 방지
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 기간 : 1년
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          나. 관련법령에 의한 정보보유 사유
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에
          의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간
          동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의
          목적으로만 이용하며 보존기간은 아래와 같습니다.
        </Text>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 계약 또는 청약철회 등에 관한 기록
          </Text>
          <View style={{ marginRight: 17, marginLeft: 17 }}>
            <Text
              style={{
                marginTop: 7,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 기간 : 5년
            </Text>
          </View>
        </View>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 대금결제 및 재화 등의 공급에 관한 기록
          </Text>
          <View style={{ marginRight: 17, marginLeft: 17 }}>
            <Text
              style={{
                marginTop: 7,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 기간 : 5년
            </Text>
          </View>
        </View>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 소비자의 불만 또는 분쟁처리에 관한 기록
          </Text>
          <View style={{ marginRight: 17, marginLeft: 17 }}>
            <Text
              style={{
                marginTop: 7,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 기간 : 3년
            </Text>
          </View>
        </View>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 본인확인에 관한 기록
          </Text>
          <View style={{ marginRight: 17, marginLeft: 17 }}>
            <Text
              style={{
                marginTop: 7,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 이유 : 정보통신망 이용촉진 및 정보보호 등에 관한 법률
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 기간 : 6개월
            </Text>
          </View>
        </View>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 방문에 관한 기록
          </Text>
          <View style={{ marginRight: 17, marginLeft: 17 }}>
            <Text
              style={{
                marginTop: 7,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 이유 : 통신비밀보호법
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 보존 기간 : 3개월
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          6. 개인정보 파기절차 및 방법
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면
          지체 없이 파기합니다. 회사의 개인정보 파기절차 및 방법은 다음과
          같습니다.
        </Text>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          가. 파기절차
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의
            DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에
            따라(보유 및 이용기간 참조)일정 기간 저장된 후 파기됩니다.
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른
            목적으로 이용되지 않습니다.
          </Text>
        </View>
        <Text style={{ marginTop: 20, fontSize: 12, fontWeight: "700" }}>
          나. 파기방법
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여
            파기합니다.
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적
            방법을 사용하여 삭제합니다.
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          7. 이용자의 권리 보호
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 이용자는 언제든지 개인정보를 조회하거나 수정할 수 있으며
            가입해지를 요청할 수도 있습니다.
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 이용자의 개인정보 조회, 수정을 위해서는 서비스내 "계정관리"
            변경을, 가입해지를 위해서는 서비스내 “회원탈퇴”를 클릭하여 직접
            탈퇴가 가능합니다.
          </Text>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면
            지체없이 조치하겠습니다.
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          8. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 개인정보는 회원가입 시 사용자가 기입한 가입정보를 수집합니다.
            개인정보 미동의 시 가입이 불가합니다.
          </Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          9. 고지의 의무
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          회사는 법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보
          취급 방침을 수정할 수 있습니다. 개인정보취급방침의 내용 추가, 삭제 및
          수정이 있을 시에는 시행일자 최소 7일전부터 서비스내 “공지사항” 을 통해
          고지할 것입니다.
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          10. 개인정보관리책임자 및 담당자의 연락처
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          귀하께서는 회사의 서비스를 이용하시면서 발생하는 모든 개인정보보호
          관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다.
          서비스 내 설정 기능의 고객지원을 통해 문의해주시면 감사하겠습니다.
        </Text>
        <View style={{ marginRight: 10, marginLeft: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 책임자
          </Text>
          <View style={{ marginRight: 17, marginLeft: 17 }}>
            <Text
              style={{
                marginTop: 7,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 이름 : 김태준
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 소속 : 쉐어플랜
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 10,
                color: styles.darkGreyColor,
              }}
            >
              - 연락처 : 010-5684-3712
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "700", marginTop: 30 }}>
          11. 개인정보취급방침의 개정과 그 공지
        </Text>
        <Text style={{ marginTop: 7, fontSize: 12 }}>
          현 개인정보취급방침이 추가 및 삭제, 수정이 있을 시에는 시행 7일 전에
          서비스 내 공지하며, 사전 공지가 곤란한 경우 지체 없이 공지할 수
          있습니다. 이 정책은 아래 시행일자부터 시행됩니다.
        </Text>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text
            style={{ marginTop: 7, fontSize: 10, color: styles.darkGreyColor }}
          >
            - 시행일: 2020년 07월 03일
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;
