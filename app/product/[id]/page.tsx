import { getProductById } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatNumber } from "@/lib/utils";
import PriceInfoCard from "@/components/PriceInfoCard";
import { Product } from "@/types";
import Image from "next/image";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            className="mx-auto"
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>

            <div className="product-info">
              <div className="flex flex-col gap-2">
                <p className="text-[34px] text-secondary font-bold">
                  {product.currency} {formatNumber(product.currentPrice)}
                </p>

                <p className="text-[21px] text-black opacity-50 line-through">
                  {product.currency} {formatNumber(product.realPrice)}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="text-sm text-black opacity-50">
                    <span className="text-primary-green font-semibold">
                      {formatNumber(product.discountRate)}{" "}
                    </span>{" "}
                    %
                  </div>

                  <div className="product-stars">
                    <Image
                      src="/assets/icons/star.svg"
                      alt="star"
                      width={16}
                      height={16}
                    />
                  </div>

                  <div className="product-reviews">
                    <Image
                      src="/assets/icons/comment.svg"
                      alt="comment"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>

                <p className="text-sm text-black opacity-50">
                  <span className="text-primary-green font-semibold">93% </span>
                  of buyers have recommended this.
                </p>
              </div>
            </div>

            <div className="my-7 flex flex-col gap-5">
              <div className="flex gap-5 flex-wrap">
                <PriceInfoCard
                  title="Current Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`${product.currency} ${formatNumber(
                    product.currentPrice
                  )}`}
                  borderColor="#b6dbff"
                />

                <PriceInfoCard
                  title="Original Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`${product.currency} ${formatNumber(
                    product.realPrice
                  )}`}
                  borderColor="#b6dbff"
                />

                <PriceInfoCard
                  title="Lowest Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`${product.currency} ${formatNumber(
                    product.lowestPrice
                  )}`}
                  borderColor="#b6dbff"
                />

                <PriceInfoCard
                  title="Highest Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`${product.currency} ${formatNumber(
                    product.highestPrice
                  )}`}
                  borderColor="#b6dbff"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
