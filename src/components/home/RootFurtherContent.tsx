import Image from "next/image";

export function RootFurtherContent() {
  return (
    <section className="relative w-full max-w-[1224px] mx-auto px-6 py-16 md:px-12 md:py-20 lg:px-[104px] lg:py-[120px]">
      {/* ROOT FURTHER small logo - centered */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/assets/home/images/root-further-logo-sm.png"
          alt=""
          width={189}
          height={67}
          className="object-contain opacity-80"
        />
        <Image
          src="/assets/home/images/root-further-logo-sm2.png"
          alt=""
          width={290}
          height={67}
          className="object-contain opacity-80"
        />
      </div>

      <div className="flex flex-col gap-6 text-white text-base font-bold leading-6 tracking-[0.5px] text-justify">
        <p>
          Đứng trước bối cảnh thay đổi như vũ bão của thời đại AI và yêu cầu ngày càng cao từ
          khách hàng, Sun* lựa chọn chiến lược đa dạng hóa năng lực để không chỉ nỗ lực trở thành
          tinh anh trong lĩnh vực của mình, mà còn hướng đến một cái đích cao hơn, nơi mỗi Sunner
          đều là &quot;problem-solver&quot; - chuyên gia trong việc giải quyết mọi vấn đề, tìm lời giải cho mọi
          bài toán của dự án, khách hàng và xã hội.
        </p>

        <p>
          Lấy cảm hứng từ sự đa dạng năng lực, khả năng phát triển linh hoạt cùng tinh thần đào
          sâu để bứt phá trong kỷ nguyên AI, &quot;Root Further&quot; đã được chọn để trở thành chủ đề chính
          thức của Lễ trao giải Sun* Annual Awards 2025.
        </p>

        <p>
          Vượt ra khỏi nét nghĩa bề mặt, &quot;Root Further&quot; chính là hành trình chúng ta không ngừng
          vươn xa hơn, cắm rễ mạnh hơn, chạm đến những tầng &quot;địa chất&quot; ẩn sâu để tiếp tục tồn tại,
          vươn lên và nuôi dưỡng đam mê kiến tạo giá trị luôn cháy bỏng của người Sun*. Muốn hình
          ảnh bộ rễ liên tục đâm sâu vào lòng đất, mạnh mẽ len lỏi qua từng lớp &quot;trầm tích&quot; để thấm
          thấu những gì tinh tuý nhất, người Sun* cũng đang &quot;hấp thụ&quot; dưỡng chất từ thời đại và
          những thử thách của thị trường để làm mới mình mỗi ngày, mở rộng năng lực và mạnh mẽ
          &quot;bén rễ&quot; vào kỷ nguyên AI - một tầng &quot;địa chất&quot; hoàn toàn mới, phức tạp và khó đoán,
          nhưng cũng hội tụ vô vàn tiềm năng cùng cơ hội.
        </p>

        <blockquote className="text-center my-8">
          <p className="text-xl font-bold">&quot;A tree with deep roots fears no storm&quot;</p>
          <cite className="block mt-2 text-base font-normal not-italic">
            (Cây sâu bền rễ, bão giông chẳng nề - Ngạn ngữ Anh)
          </cite>
        </blockquote>

        <p>
          Trước giông bão, chỉ những tán cây có bộ rễ đủ mạnh mới có thể trụ vững. Một tổ chức với
          những cá nhân tự tìm vào năng lực đa dạng, sẵn sàng kiến tạo và đón nhận thử thách, làm
          chủ sự thay đổi là tổ chức không chỉ vững vàng trước biến động, mà còn khai thác được
          mọi lợi thế, chinh phục các thách thức của thời cuộc. Không đơn thuần là tên gọi của
          chương mới trên hành trình phát triển tổ chức, &quot;Root Further&quot; còn như một lời kêu gọi, đồng
          viên mỗi chúng ta hãy dám tin vào bản thân, dám đào sâu, khai mở mọi tiềm năng, dám
          phá bỏ giới hạn, đam trở thành phiên bản đa nhiệm và xuất sắc nhất của mình. Bởi trong
          thời đại AI, đa dạng năng lực và tận dụng sức mạnh thời cuộc chính là điều kiện tiên quyết
          để trường tồn.
        </p>

        <p>
          Không ai biết trước ẩn sâu trong &quot;lòng đất&quot; của ngành công nghệ và thị trường hiện đại
          còn biết bao tầng &quot;địa chất&quot; bí ẩn. Chỉ biết rằng khi &quot;Root Further&quot; đã trở thành tinh thần
          cốt rễ, chúng ta sẽ không sợ hãi, mà càng thấy háo hức trước bất cứ vùng vỡ đình nào trên
          hành trình tiến về phía trước. Vì ta luôn tin rằng, trong chính những miền vô tận đó, là bao
          điều kỳ diệu và cơ hội vươn mình đang chờ ta.
        </p>
      </div>
    </section>
  );
}
